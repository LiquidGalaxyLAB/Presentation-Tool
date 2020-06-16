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


// upload media
// receives an array of multipart content-type media + storagePath + array of screens
router.post("/upload", upload.array('media'), (req, res, next) => {

    var media = []
    var storagePath = req.body.storagepath
    for (var i = 0; i < req.files.length; i++) {
        if (req.body.screens[i].partner != undefined)
            media.push(Object.assign({ filename: req.files[i].originalname, screen: req.body.screens[i].screen, partner: req.body.screens[i].partner, type: req.body.screens[i].type }))
        else
            media.push(Object.assign({ filename: req.files[i].originalname, screen: req.body.screens[i].screen }))
    }

    console.log('MEDIA', media)
    console.log('PATH', storagePath)

    sendToStorage(media, storagePath)
        .then(() => res.json('200'))
        .catch(() => res.json('500'))

})

// this call cleans the whole local storage
router.get('/clean', (req, res, next) => {
    cleanStorage()
        .then(() => res.json('200'))
        .catch(() => res.json('500'))
})

module.exports = router

// helper functions
async function sendToStorage(media, path) {
    return await parser.mediaStorage(media, path)
}

async function cleanStorage() {
    return await parser.cleanStorage()
}