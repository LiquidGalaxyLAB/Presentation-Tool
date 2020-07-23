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

router.post("/import", upload.single('presentationzip'),(req, res, next) => {
    console.log('req.file', req.file)
    importPresentation(req.file.filename)
        .then((response) => {
            res.json(response)
        })
        .catch((error) => {
            res.json(error)
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
