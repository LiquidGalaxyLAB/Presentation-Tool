const express = require('express')
const router = express.Router()
const parser = require('../parser/main')
const { exec } = require('child_process')
var multer = require('multer')
const share = require('../parser/modules/share')

// configure localstorage for files using multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //storage/all - both dirs need to be created before receiving a request
        cb(null, `${process.env.FILE_PATH}/storage/all`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

/**
 * @swagger
 *
 * /share/export/{id}:
 *   get:
 *     description: Receives the id of a presentation as parameter and stores 
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
router.get("/export/:id", (req, res, next) => {
    exportPresentation(req.params.id)
        .then((response) => {
            var fileName = response.path
            var maxscreens = response.maxscreens
            console.log('FILENAME', fileName)
            res.sendFile(fileName, function (err) {
                if (err) {
                    next(err)
                } else {
                    console.log('Sent:', fileName)
                    deleteExportedTempZip(fileName,maxscreens)
                }
            })
        })
        .catch((error) => {
            res.json(error)
        })
})

/**
 * @swagger
 *
 * /share/import:
 *   post:
 *     description: Receives a .zip containing a presentation and imports it to the database and storage
 *     consumes:
 *        - multipart/form-data
 *     parameters:
 *        - name: presentationzip
 *          description: The presentation .zip has to be in a valid format that was created by the EXPORT endpoint
 *          type: file
 *          in: formData
 *          required: true
 *     responses:
 *       200:
 *         description: Success. Presentation imported with success!
 *       500:
 *         description: Internal Server Error. Error importing presentation
 */
router.post("/import", upload.single('presentationzip'),(req, res, next) => {
    console.log('req.file', req.file)
    importPresentation(req.file.filename)
        .then((response) => {
            res.status(response.status).json(response)
        })
        .catch((error) => {
            res.status(error.status).json(error)
        })
})


module.exports = router

// helper functions
async function exportPresentation(id) {
    return await parser.exportPresentation(id)
}

async function importPresentation(filename) {
    return await parser.importPresentation(filename)
}

function deleteExportedTempZip(pathToZip, maxscreens) {
    return share.deleteTempExportedFiles(pathToZip, maxscreens)
}
