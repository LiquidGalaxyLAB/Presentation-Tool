// This file has all the functions related to managing the local storage in all screens

const { exec } = require('child_process')

module.exports = {
    sendMediaToDefinedLG: async function (media, path) {
        console.log('MEDIA-path', media, path)
        var response
        for (var i = 0; i < media.length; i++) {
            if (media[i].partner != undefined) {
                var res = cropImageInTwoAndSave(media[i].screen, media[i].partner, path,media[i].filename)
                response = res
            }
            else {
                var destpath

                if (media[i].screen != 1)
                    destpath = `${process.env.SLAVE_STORAGE}`
                else
                    destpath = `${process.env.FILE_PATH}/storage`

                await createStoragePathSingleScreen(media[i].filename, media[i].screen, `${process.env.FILE_PATH}/storage/all`, `${destpath}/${path}`).then((res) => {
                    response = res
                }).catch((err) =>
                    response = err)
            }

        }

        return response

    },
    cleanStorage: function () {
        return new Promise((resolve, reject) => {
            exec(`rm ${process.env.FILE_PATH}/storage/all/*`, (err, stdout, stderr) => {
                if (err) {
                    console.log(err)
                    reject({ status: 500, msg: `Internal Server Error. Error on cleaning storage: ${err}` })
                }
                if (stderr) {
                    console.log('stderr', stderr)
                    reject({ status: 500, msg: `Internal Server Error. Error on cleaning storage: ${stderr}` })
                }
                else {
                    resolve({ status: 200, msg: `Success. Cleanned up storage with success` })
                }
            })
        })
    },
    deleteMediaFromLG: function (presentationJson) {
        var storagepath
        return new Promise((resolve, reject) => {
            
            if(presentationJson != undefined){
                storagepath = `${presentationJson.id}`
            }
            else{
                reject({status: 500, msg: "Internal Server Error. Presentation was not found inside the storage"})
            }
            
            exec(`${process.env.FILE_PATH}/api/parser/scripts/deleteMedia.sh ${process.env.SLAVE_STORAGE}/${storagepath} ${process.env.FILE_PATH}/storage/${storagepath} ${presentationJson.maxscreens}`, (err, stdout, stderr) => {
                if (err) {
                    console.log('Error on executing deleteMedia.sh ', err)
                    reject(err)
                }
                if (stderr) {
                    console.log('stderr', stderr)
                    reject(stderr)
                }
                else {
                    resolve('ok')
                }

            })
        })

    }
}
function createStoragePathSingleScreen(filename, screen, currentpath, destinationpath) {
    return new Promise((resolve, reject) => {
        exec(`${process.env.FILE_PATH}/api/parser/scripts/createStoragePath.sh "${filename}" ${screen} "${currentpath}" "${destinationpath}"`, (err, stderr, stdout) => {
            if (err) {
                console.log(`Unable to create storage path and copy to specific storage directory ${err}`)
                reject({status: 500, msg:`Internal Server Error. Unable to create storage path and copy to specific storage directory ${err}`})
            }
            else {
                console.log('Success', stdout)
                resolve({status: 200, msg: `Sucessfully created storage path and copied media to specific screen`})
            }
        })
    })
}

function cropImageInTwoAndSave(leftScreen, rightScreen, file_path, file_name) {
    console.log('crop in two and save start')
    var leftDest, rightDest

    if (leftScreen != 1)
        leftDest = `${process.env.SLAVE_STORAGE}/${file_path}`
    else
        leftDest = `${process.env.FILE_PATH}/storage/${file_path}`
    if (rightScreen != 1)
        rightDest = `${process.env.SLAVE_STORAGE}/${file_path}`
    else
        rightDest = `${process.env.FILE_PATH}/storage/${file_path}`


    return new Promise((resolve, reject) => {
        var leftDir = new Promise((resolve, reject) => {
            exec(`ssh lg${leftScreen} "if [ ! -d ${leftDest} ]; then 
            mkdir ${leftDest}
            fi"`, (err, stdout, stderr) => {
                if (err) {
                    console.error('Error on creating storage directory on leftScreen', err)
                    reject({ status: 500, msg: `Internal Server Error. Error on creating storage directory on leftScreen ${err}` })
                }
                if (stderr) {
                    console.error('Error on creating storage directory on leftScreen', stderr)
                    reject({ status: 500, msg: `Internal Server Error. Error on creating storage directory on leftScreen ${stderr}` })
                }
                else {
                    console.log('Success on creating storage directory on leftScreen', stdout)
                    resolve()
                }
            })
        })

        var rightDir = new Promise((resolve, reject) => {
            exec(`ssh lg${rightScreen} "if [ ! -d ${rightDest} ]; then 
            mkdir ${rightDest}
            fi"`, (err, stdout, stderr) => {
                if (err) {
                    console.error('Error on creating storage directory on rightScreen', err)
                    reject({ status: 500, msg: `Internal Server Error. Error on creating storage directory on rightScreen ${err}` })
                }
                if (stderr) {
                    console.error('Error on creating storage directory on rightScreen', stderr)
                    reject({ status: 500, msg: `Internal Server Error. Error on creating storage directory on rightScreen ${stderr}` })
                }
                else {
                    console.log('Success on creating storage directory on rightScreen', stdout)
                    resolve()
                }
            })
        })

        return Promise.all([leftDir, rightDir])
            .then(() => {
                //crop image and send to created storage
                exec(`${process.env.FILE_PATH}/api/parser/scripts/cropImage2.sh "${leftScreen}" "${rightScreen}" "${process.env.FILE_PATH}/storage/all/${file_name}" "${file_name}" "${leftDest}" "${rightDest}"`, (err, stdout, stderr) => {
                    if (err) {
                        console.error('Error on cropping image and sending to screen storage', err)
                        reject({ status: 500, msg: `Internal Server Error. Error on cropping image and sending to screen storage ${err}` })
                    }
                    if (stderr) {
                        console.error('Error on cropping image and sending to screen storage', stderr)
                        reject({ status: 500, msg: `Internal Server Error. Error on cropping image and sending to screen storage ${stderr}` })
                    }
                    else {
                        console.log('Success on cropping image and sending to screen storage', stdout)
                        resolve({ status: 200, msg: `Success. Images cropped and uploaded with success` })
                    }
                })
            })
            .catch((err) => {
                reject(err)
            })
    })
}