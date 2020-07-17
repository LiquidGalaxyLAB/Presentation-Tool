const express = require('express')
const router = express.Router()
const parser = require('../parser/main')
const { exec } = require('child_process')

router.get("/export/:id", (req, res, next) => {
    console.log('req.body', req.params)
    exportPresentation(req.params.id)
        .then((response) => {
            var fileName = response.path
            console.log('FILENAME', fileName)
            res.sendFile(fileName, function (err) {
                if (err) {
                    next(err)
                } else {
                    console.log('Sent:', fileName)
                    deleteExportedTempZip(fileName)
                }
            })
        })
        .catch((error) => {
            res.json(error)
        })
})

router.get("/import", (req, res, next) => {
    console.log('req.body', req.body)
    importPresentation()
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

async function importPresentation() {
    return await parser.importPresentation()
}

function deleteExportedTempZip(pathToZip) {
    exec(`rm '${pathToZip}'`, (err, stdout, stderr) => {
        if (err) {
            console.log('stderr', stderr, err)
        }
        else{
            console.log('stdout',stdout)
        }
    })
}
