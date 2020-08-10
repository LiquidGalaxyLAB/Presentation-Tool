const parser = require('../parser/main')
const express = require('express')
const router = express.Router()

/**
 * @swagger
 *
 * /presentation/execute/{id}:
 *   get:
 *     tags:
 *      - presentation
 *     description: Executes a presentation. Receives the id of the presentation that is going to be executed as a parameter
 *     parameters:
 *        - name: id
 *          description: The _id of the presentation. The one that represents the document
 *          type: string
 *          in: path
 *          required: true
 *     responses:
 *       202:
 *         description: Accepted. The request has being accepted to start proccessing. Executing presentation has started
 *       500:
 *         description: Internal Server Error. Something wrong happened with the server, either storage or database.
 *       400:
 *         description: Bad Request. There's something wrong with the parameter you used
 *       404:
 *         description: Not found. The presentation you are trying to execute was not found on the database
 */
router.get("/execute/:id", (req, res, next) => {
    var id = req.params.id
    executePresentation(id)
        .then((response) => {
            res.status(response.status).json(response)
        })
        .catch((err) => {
            res.status(err.status).json(err)
        })

})

/**
 * @swagger
 *
 * /presentation/stop:
 *   get:
 *     tags:
 *      - presentation
 *     description: Stops all the current tasks used when running a presentation
 *     responses:
 *       200:
 *         description: Success. Stopped current presentation execution
 *       500:
 *         description: Internal Server Error. Error on stopping presentation execution
 */
router.get("/stop", (req, res, next) => {
    stopPresentation()
        .then((response) => {
            res.status(response.status).json(response)
        })
        .catch((error) => {
            res.status(error.status).json(error)
        })
})

/**
 * @swagger
 *
 * /presentation/getall:
 *   get:
 *     tags:
 *      - presentation
 *     description: Gets all saved presentations from the database
 *     responses:
 *       200:
 *         description: Success. Retrived all documents from the database
 *       500:
 *         description: Internal Server Error. An error occured while getting documents from the database
 */
router.get("/getall", (req, res, next) => {
    getAllPresentations().then((array) => {
        console.log('array', array)
        res.status(200).send(array)
    })
        .catch(() => {
            res.status(500).json({status: 'Internal Server Error. An error occured while getting documents from the database'})
        })
})

/**
 * @swagger
 *
 * /presentation/create:
 *   post:
 *     tags:
 *      - presentation
 *     description: Receives a json with the structure of a presentation and creates new presentation in the database
 *     parameters:
 *         - name: presentation object
 *           in: body
 *           description: A json following the required format containing information about a presentation. Slides and screens can be added to the json, as well parameters can be removed. Check full documentation for more information about each field
 *           required: true
 *           schema:
 *              type: object
 *              properties:
 *                id:
 *                 type: string
 *                title:
 *                 type: string
 *                description:
 *                 type: string
 *                maxscreens:
 *                 type: integer
 *                category: 
 *                 type: string
 *                audiopath:
 *                 type: string
 *                slides:
 *                 type: array
 *                 items:
 *                  type: object
 *                  properties:
 *                   id:
 *                    type: string
 *                   duration:
 *                    type: integer
 *                   audiopath:
 *                    type: string 
 *                   flyto:
 *                    type: string
 *                   screens:
 *                    type: array
 *                    items:
 *                     type: object
 *                     properties:
 *                      screennumber:
 *                       type: integer
 *                      media:
 *                       type: array
 *                       items:
 *                        type: object
 *                        properties:
 *                         id:
 *                          type: string
 *                         filename:
 *                          type: string
 *                         type:
 *                          type: string
 *                         storagepath:
 *                          type: string
 *                         position:
 *                          type: string
 *                         sharing:
 *                          type: boolean
 *                         partner:
 *                          type: integer
 *     responses:
 *       201:
 *         description: Success. Document created with success
 *       500:
 *         description: Internal Server Error. Error on creating document
 */
router.post("/create", (req, res, next) => {
    var presentation = req.body
    createPresentation(presentation)
        .then((response) => {
            res.status(response.status).json(response)
        })
        .catch((err) => {
            res.status(err.status).json(err)
        })
})

/**
 * @swagger
 *
 * /presentation/delete/{id}:
 *   delete:
 *     tags:
 *      - presentation
 *     description: Receives the id of a presentation as parameter and deletes it from the database and from the Liquid Galaxy storage
 *     parameters:
 *        - name: id
 *          description: The _id field of the presentation. The one that represents the document id
 *          type: string
 *          in: path
 *          required: true
 *     responses:
 *       200:
 *         description: Success. The presentation was succesfully deleted from the database and the storage
 *       500:
 *         description: Internal Server Error. Something wrong happened with the server, either storage or database.
 *       404:
 *         description: Not found. The presentation you are trying to delete was not found on the database
 */
router.delete("/delete/:id", (req, res, next) => {
    var id = req.params.id
    deletePresentation(id)
        .then((response) => {
            res.status(response.status).json(response)
        })
        .catch((err) => {
            res.status(err.status).json(err)
        })
})

/**
 * @swagger
 *
 * /presentation/update:
 *   patch:
 *     tags:
 *      - presentation
 *     description: Receives the fields of the document that needs to be updated in the db and the id of the presentation
 *     parameters:
 *        - name: data
 *          description: A json that contains the _id of the presentation and a data field with all the desired changes
 *          type: string
 *          in: body
 *          required: true
 *          schema:
 *           type: object
 *           properties:
 *             id:
 *              type: string
 *             data:
 *              type: object 
 *     responses:
 *       200:
 *         description: Success. Document updated with success
 *       500:
 *         description: Internal Server Error. Unable to update document.
 */
router.patch("/update", (req, res, next) => {
    var data = req.body

    updatePresentation(data)
        .then((response) => {
            res.status(response.status).json(response)
        })
        .catch((error) => {
            res.status(error.status).json(error)
        })
})

module.exports = router

// helper functions
async function executePresentation(id) {
    return await parser.executePresentation(id)
}

async function createPresentation(presentation) {
    return await parser.createPresentation(presentation)
}

async function deletePresentation(id) {
    return await parser.deletePresentation(id)
}

async function updatePresentation(data) {
    return await parser.updatePresentation(data)
}

async function getAllPresentations() {
    return await parser.getAllPresentations()
}

async function stopPresentation() {
    return await parser.stopPresentation()
}