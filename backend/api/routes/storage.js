const parser = require('../parser/main')
const express = require('express')
const router = express.Router()
var multer = require('multer')
const { json } = require('express')

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

// ROUTES: the routes on this file are supposed to control all related functionalities to the local storage

// upload media
// receives an array of multipart content-type media + storagePath + array of screens
router.post("/upload", upload.array('media'), (req, res, next) => {
    var screens
    
    if(typeof req.body.screens === 'string'){
        screens = JSON.parse(req.body.screens)
    }
    else{
        screens = req.body.screens
    }
    console.log('screens',screens)
    var media = []
    var storagePath = req.body.storagepath
    for (var i = 0; i < req.files.length; i++) {
        if (screens[i].partner != undefined)
            media.push(Object.assign({ filename: req.files[i].originalname, screen: screens[i].screen, partner: screens[i].partner, type: screens[i].type }))
        else
            media.push(Object.assign({ filename: req.files[i].originalname, screen: screens[i].screen }))
    }

    console.log('MEDIA', media)
    console.log('PATH', storagePath)

   sendToStorage(media, storagePath)
        .then((response) => res.json(response))
        .catch((error) => res.json(error))

})

// clean storage
// this call cleans the whole local storage
router.get('/clean', (req, res, next) => {
    cleanStorage()
        .then((response) => res.json(response))
        .catch((error) => res.json(error))
})

module.exports = router

// helper functions
async function sendToStorage(media, path) {
    return await parser.mediaStorage(media, path)
}

async function cleanStorage() {
    return await parser.cleanStorage()
}