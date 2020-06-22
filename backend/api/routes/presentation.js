const parser = require('../parser/main')
const express = require('express')
const router = express.Router()

// execute
// receives the id of the presentation that is going to be executed
router.get("/execute/:id", (req, res, next) => {
    var id = req.params.id
    executePresentation(id)
        .then(() => {
            res.json('200')
        })
        .catch((err) => {
            res.json('500')
        })

})

router.get("/stop", (req, res, next) => {
    stopPresentation()
        .then(() => {
            res.json('200')
        })
        .catch((err) => {
            res.json('500')
        })
})

// get all
// gets all saved presentations from the database
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
// receives the json with the info and calls the functions to save in the db
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
//receives presentation id, calls functions to delete from db and from all machines and storage
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
// receives the fields of the doc that needs to be updated and the id of the presentation
router.patch("/update", (req, res, next) => {
    var data = req.body
    updatePresentation(data)
        .then(() => {
            res.json('200')
        })
        .catch(() => {
            res.json('500')
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