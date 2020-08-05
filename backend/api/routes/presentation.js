const parser = require('../parser/main')
const express = require('express')
const router = express.Router()

// execute
// 

/**
 * @swagger
 *
 * /presentation/execute/:id:
 *   get:
 *     description: Executes a presentation. Receives the id of the presentation that is going to be executed
 *     parameters:
 *        - name: id
 *          description: id of the presentation
 *          required: true
 *     responses:
 *       202:
 *         description: Presentation successfully stopped
 *       500:
 *         description: Internal server error
 */
router.get("/execute/:id", (req, res, next) => {
    var id = req.params.id
    executePresentation(id)
        .then((response) => {
            res.json(response)
        })
        .catch((err) => {
            res.json(err)
        })

})

/**
 * @swagger
 *
 * /presentation/stop:
 *   get:
 *     description: Stops all the current tasks used when running a presentation
 *     responses:
 *       200:
 *         description: Presentation successfully stopped
 */
router.get("/stop", (req, res, next) => {
    stopPresentation()
        .then((response) => {
            res.json(response)
        })
        .catch((error) => {
            res.json(error)
        })
})

/**
 * @swagger
 *
 * /presentation/getall:
 *   get:
 *     description: Gets all saved presentations from the database
 *     responses:
 *       200:
 *         description: Retrieves all documents
 *       500:
 *         description: Internal server error
 */
router.get("/getall", (req, res, next) => {
    getAllPresentations().then((array) => {
        console.log('array', array)
        res.send(array)
    })
        .catch(() => {
            res.json('500')
        })
})

// create
// receives the json with the info and calls the functions to save a new presentation in the database
router.post("/create", (req, res, next) => {
    var presentation = req.body
    createPresentation(presentation)
        .then((response) => {
            res.json(response)
        })
        .catch((err) => {
            res.json(err)
        })
})

// delete
// receives presentation id, calls functions to delete from db and from all machines and storage
router.delete("/delete/:id", (req, res, next) => {
    var id = req.params.id
    deletePresentation(id)
        .then((response) => {
            res.json(response)
        })
        .catch((err) => {
            res.json(err)
        })
})

// update
// receives the fields of the document that needs to be updated in the db and the id of the presentation
router.patch("/update", (req, res, next) => {
    var data = req.body

    updatePresentation(data)
        .then((response) => {
            res.json(response)
        })
        .catch((error) => {
            res.json(error)
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