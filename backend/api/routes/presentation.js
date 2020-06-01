const parser = require('../parser/main')
const express = require('express')
const router = express.Router()
var multer = require('multer')

// configure localstorage for files
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //storage/all - both dirs need to be created before receiving a request
        cb(null, `${process.env.FILES_PATH}/storage/all`)
    },
    filename: function (req, file, cb) {
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

// execute
router.get("/execute/:id", (req, res, next) => {

    callParser().then(() => {
        res.json(`Hello World`)
    })

})

// get all
// gets all saved presentations from the database
router.get("/getall", (req, res, next) => {
    res.json('oi')
})

// create
// receives the json with the info and calls the functions to save in the db
router.post("/create", (req, res, next) => {
    res.json('oi')

})

// upload media
// receives an array of multipart content-type media + storagePath + array of screens
router.post("/upload", upload.array('media'), (req, res, next) => {
    
    var media = []
    var storagePath = req.body.storagePath
    for (var i = 0; i < req.files.length; i++) {
        media.push(Object.assign({ filename: req.files[i].originalname, screen: req.body.screens[i] }))
    }

    console.log('MEDIA',media)
    console.log('PATH',storagePath)

    sendToStorage(media, storagePath)
        .then(() => res.json('200'))
        .catch(() => res.json('500'))

})

// delete
router.delete("/delete/:id", (req, res, next) => {
    //receives presentation id, calls functions to delete from db and from all machines and storage
})


module.exports = router

// helper functions
async function callParser() {
    return await parser.executeScript()
}

async function sendToStorage(media, path) {
    return await parser.mediaStorage(media, path)
}