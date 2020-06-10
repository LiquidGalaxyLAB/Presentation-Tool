const parser = require('../parser/main')
const express = require('express')
const router = express.Router()
var multer = require('multer')

// configure localstorage for files
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //storage/all - both dirs need to be created before receiving a request
        cb(null, `${process.env.FILE_PATH}/storage/all`)
    },
    filename: function (req, file, cb) {
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

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
    console.log('PRESENTATION JSON BODY', presentation)
    createPresentation(presentation)
        .then(() => {
            res.json('200')
        })
        .catch(() => {
            res.json('500')
        })
})

// upload media
// receives an array of multipart content-type media + storagePath + array of screens
router.post("/upload", upload.array('media'), (req, res, next) => {
    
    var media = []
    var storagePath = req.body.storagepath
    for (var i = 0; i < req.files.length; i++) {
        if(req.body.screens[i].partner != undefined)
            media.push(Object.assign({ filename: req.files[i].originalname, screen: req.body.screens[i].screen , partner: req.body.screens[i].partner, type: req.body.screens[i].type}))
        else
            media.push(Object.assign({ filename: req.files[i].originalname, screen: req.body.screens[i].screen}))
        }

    console.log('MEDIA', media)
    console.log('PATH', storagePath)

    sendToStorage(media, storagePath)
        .then(() => res.json('200'))
        .catch(() => res.json('500'))

})

// delete
//receives presentation id, calls functions to delete from db and from all machines and storage
router.delete("/delete/:id", (req, res, next) => {
    console.log('REQ PARAMS', req.params)
    var id = req.params.id
    deletePresentation(id).then(() => res.json('200')).catch(() => res.json('500'))
})

// update
// receives the fields of the doc that needs to be updated and the id of the presentation
router.patch("/update", (req,res, next) =>{
    var data = req.body
    updatePresentation(data)
    .then(() =>{
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

async function sendToStorage(media, path) {
    return await parser.mediaStorage(media, path)
}

async function createPresentation(presentation) {
    return await parser.createPresentation(presentation)
}

async function deletePresentation(id) {
    return await parser.deletePresentation(id)
}

async function updatePresentation(data){
    return await parser.updatePresentation(data)
}

async function getAllPresentations() {
    return await parser.getAllPresentations()
}