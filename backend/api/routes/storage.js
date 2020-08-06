const parser = require('../parser/main')
const express = require('express')
const router = express.Router()
var multer = require('multer')

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

/**
 * @swagger
 *
 * /storage/upload:
 *   post:
 *     description: Receives an array of multipart content-type media + storagepath + array of screens. DISCLAIMER -This swagger instance only accepts one media file per time
 *     consumes:
 *        - multipart/form-data
 *     parameters:
 *        - name: media
 *          description: Media file. 
 *          type: file
 *          in: formData
 *          required: true
 *        - name: storagepath
 *          description: The path to save the media. It has to be the id of the presentation
 *          type: string
 *          in: formData
 *          required: true
 *        - name: screen
 *          description: The screen that was choosen on the presentation create to display this media
 *          type: integer
 *          in: formData
 *          required: true
 *        - name: type
 *          description: The media type (video or image)
 *          in: formData
 *          required: true
 *        - name: partner
 *          description: If the sharing position was defined as true for this media, send the screen that will be the partner. (Partner is always the screen on the right)
 *          type: integer
 *          in: formData
 *     responses:
 *       200:
 *         description: Success. All media was uploaded and stored with success
 *       500:
 *         description: Internal Server Error. An error occurred while uploading and storing the media on the Liquid Galaxy
 */
router.post("/upload", upload.array('media'), (req, res, next) => {
    var screens
    var media = []
    var storagePath = req.body.storagepath

    if (req.body.screens != undefined) {
        if (typeof req.body.screens === 'string') {
            screens = JSON.parse(req.body.screens)
        }
        else {
            screens = req.body.screens
        }
        
        for (var i = 0; i < req.files.length; i++) {
            if (screens[i].partner != undefined)
                media.push(Object.assign({ filename: req.files[i].originalname, screen: screens[i].screen, partner: screens[i].partner, type: screens[i].type }))
            else
                media.push(Object.assign({ filename: req.files[i].originalname, screen: screens[i].screen }))
        }
    }
    else {
        if (req.body.partner != undefined)
            media.push(Object.assign({ filename: req.files[0].originalname, screen: req.body.screen, partner: req.body.partner, type: req.body.type }))
        else
            media.push(Object.assign({ filename: req.files[0].originalname, screen: req.body.screen }))
    }

    console.log('MEDIA', media)
    console.log('PATH', storagePath)

    sendToStorage(media, storagePath)
        .then((response) => res.status(response.status).json(response))
        .catch((error) => res.status(error.status).json(error))

})

/**
 * @swagger
 *
 * /storage/clean:
 *   get:
 *     description: This endpoint cleans the whole local storage
 *     responses:
 *       200:
 *         description: Success. Cleanned up storage with success
 *       500:
 *         description: Internal Server Error. Error on cleaning storage
 */
router.get('/clean', (req, res, next) => {
    cleanStorage()
        .then((response) => res.status(response.status).json(response))
        .catch((error) => res.status(error.status).json(error))
})

module.exports = router

// helper functions
async function sendToStorage(media, path) {
    return await parser.mediaStorage(media, path)
}

async function cleanStorage() {
    return await parser.cleanStorage()
}