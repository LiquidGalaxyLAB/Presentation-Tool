// This file has all the functions related to managing the local storage in all screens

const { exec } = require('child_process')

module.exports = {
    sendMediaToDefinedLG: function (media, path) {
        var response

        return new Promise((resolve, reject) => {
            for (var i = 0; i < media.length; i++) {
                if (media[i].partner != undefined) {
                    if (media[i].type == 'image') {
                        var res = cropImageInTwoAndSave(media[i].screen, media[i].partner, path, media[i].filename)
                        resolve(res)
                    }
                    else {
                        console.log('Video Sharing Not Implemented')
                        resolve({ status: 501, msg: `Not implemented. This functionality is still not implemented by the API` })
                    }
                }
                else {
                    if (media[i].screen == 1) {

                        var createDir = new Promise((resolve, reject) => {
                            exec(`if [ ! -d ${process.env.FILE_PATH}/storage/${path} ]; then 
                        mkdir ${process.env.FILE_PATH}/storage/${path}
                        fi
                        `, (err, stdout, stderr) => {
                                if (err) {
                                    console.error('Error on creating storage directory to specific screen', err)
                                    reject({ status: 500, msg: `Error on copying from global storage to specific screen ${err}` })
                                }
                                if (stderr) {
                                    console.log('Error on creating storage directory to specific screen', stderr)
                                    reject({ status: 500, msg: `Error on copying from global storage to specific screen ${stderr}` })
                                }
                                else {
                                    console.log('Success on creating storage directory to specific screen'), stdout
                                    resolve()
                                }
                            })
                        })

                        var cpStorage = new Promise((resolve, reject) => {
                            exec(`cp ${process.env.FILE_PATH}/storage/all/"${media[i].filename}" ${process.env.FILE_PATH}/storage/${path}/`, (err, stdout, stderr) => {
                                if (err) {
                                    console.error('Error on copying from global storage to specific screen', err)
                                    reject({ status: 500, msg: `Error on copying from global storage to specific screen ${err}` })
                                }
                                if (stderr) {
                                    console.log('Error on copying from global storage to specific screen', stderr)
                                    reject({ status: 500, msg: `Error on copying from global storage to specific screen ${stderr}` })
                                }
                                else {
                                    console.log('Copied media from global storage to specific screen', stdout)
                                    resolve()
                                }
                            })
                        })

                        Promise.all([createDir, cpStorage])
                            .then(() => {
                                response = { status: 200, msg: `Media uploaded and stored with success` }
                                resolve(response)
                            })
                            .catch((errors) => {
                                response = errors
                                reject(response)
                            })
                    }
                    else {
                        var createDir = new Promise((resolve, reject) => {
                            exec(`ssh lg${media[i].screen} "if [ ! -d ${process.env.SLAVE_STORAGE}/${path} ]; then 
                            mkdir ${process.env.SLAVE_STORAGE}/${path}
                            fi"`, (err, stdout, stderr) => {
                                if (err) {
                                    console.error('Error on creating storage directory to specific screen', err)
                                    reject({ status: 500, msg: `Error on copying from global storage to specific screen ${err}` })
                                }
                                if (stderr) {
                                    console.log('Error on creating storage directory to specific screen', stderr)
                                    reject({ status: 500, msg: `Error on copying from global storage to specific screen ${stderr}` })
                                }
                                else {
                                    console.log('Success on creating storage directory to specific screen'), stdout
                                    resolve()
                                }
                            })
                        })

                        var cpStorage = new Promise((resolve, reject) => {
                            exec(`scp ${process.env.FILE_PATH}/storage/all/"${media[i].filename}" lg${media[i].screen}:${process.env.SLAVE_STORAGE}/${path}/`, (err, stdout, stderr) => {
                                if (err) {
                                    console.error('Error on copying from global storage to specific screen', err)
                                    reject({ status: 500, msg: `Error on copying from global storage to specific screen ${err}` })
                                }
                                if (stderr) {
                                    console.log('Error on copying from global storage to specific screen', stderr)
                                    reject({ status: 500, msg: `Error on copying from global storage to specific screen ${stderr}` })
                                }
                                else {
                                    console.log('Copied media from global storage to specific screen', stdout)
                                    resolve()
                                }
                            })
                        })

                        Promise.all([createDir, cpStorage])
                            .then(() => {
                                response = { status: 200, msg: `Media uploaded and stored with success` }
                                resolve(response)
                            })
                            .catch((errors) => {
                                response = errors
                                reject(response)
                            })
                    }
                }
            }
        })
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
        var storagepath = presentationJson.slides[0].screens[0].media[0].storagepath

        return new Promise((resolve, reject) => {
            exec(`${process.env.FILE_PATH}/api/parser/scripts/deleteMedia.sh ${process.env.SLAVE_STORAGE}/${storagepath} ${process.env.FILE_PATH}/storage/${storagepath}`, (err, stdout, stderr) => {
                if (err) {
                    console.log('Error on executing deleteMedia.sh ', err)
                    reject(err)
                }
                if (stderr) {
                    console.log('stderr', stderr)
                    resolve(stderr)
                }
                else {
                    resolve('ok')
                }

            })
        })

    }
}

function cropImageInTwoAndSave(leftScreen, rightScreen, file_path, file_name) {
    var leftDest, rightDest, response

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
    /*var leftDir = new Promise((resolve, reject) => {
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

    var cropAndSend = new Promise((resolve, reject) => {
        console.log(`AAAAAAAAAAAAAAA   ${process.env.FILE_PATH}/api/parser/scripts/cropImage2.sh "${leftScreen}" "${rightScreen}" "${process.env.FILE_PATH}/storage/all/${file_name}" "${file_name}" "${leftDest}" "${rightDest}"` )

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
                resolve()
            }
        })
    })

    return Promise.all([leftDir, rightDir, cropAndSend])*/

}