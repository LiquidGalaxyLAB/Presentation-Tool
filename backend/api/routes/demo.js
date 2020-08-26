const express = require('express')
const router = express.Router()
const parser = require('../parser/main')
const { exec } = require('child_process')
const fs = require('fs')

/**
 * @swagger
 *
 * /demo:
 *   get:
 *     tags:
 *      - demo
 *     description: Launches a demo presentation
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/', (req, res, next) => {
    demoPresentation().then((response) => {
        res.status(response.status).send(response)
    })
        .catch((error) => {
            res.status(error.status).send(error)
        })
})

module.exports = router

async function demoPresentation() {
    return new Promise(async (resolve, reject) => {
        var dir = `${process.env.FILE_PATH}/storage/497f5510-b354-4e48-8d40-688cc6ba3659`
        if(fs.existsSync(dir)){
            await parser.executePresentation('5f18a16a4417a6565c3ecddf').then((response) =>{
                resolve(response)
            })
            .catch((err) =>{
                reject(err)
            })
        }
        else{
            return new Promise((resolve, reject) => {
                // copy .zip to storage/all
                exec(`cp ${process.env.FILE_PATH}/utils/Brasil.zip ${process.env.FILE_PATH}/storage/all`, (err, stdout, stderr) => {
                    if (err) {
                        console.log('Error on copy')
                        reject({ status: 500, msg: 'Internal Server Error. Unable to copy to new directory' })
                    }
                    else {
                        resolve()
                    }
                })
            }).then(async () => {
                // import zip
                await parser.importPresentation('Brasil.zip')
                    .then(async (response) => {
                        console.log('RESPONSE', response)
                        // execute presentation
                        await parser.executePresentation('5f18a16a4417a6565c3ecddf').then((response) =>{
                            resolve(response)
                        })
                        .catch((err) =>{
                            reject(err)
                        })
                    })
                    .catch((error) => {
                        console.log('EROOR', error)
                        reject(err)
                    })
            }).catch((err) =>{
                reject(err)
            })
        }

        
    })
}