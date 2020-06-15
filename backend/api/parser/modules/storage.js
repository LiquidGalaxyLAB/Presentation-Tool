const { exec } = require('child_process')

module.exports = {
    sendMediaToDefinedLG: function (media, path) {
        for (var i = 0; i < media.length; i++) {
            if (media[i].partner != undefined) {
                if (media[i].type == 'image') {
                    cropImageInTwoAndSave(media[i].screen, media[i].partner, path, media[i].filename)
                }
                else {
                    console.log('video sharing')
                }
            }
            else {
                if (media[i].screen == 1) {
                    exec(`if [ ! -d ${process.env.FILE_PATH}/storage/${path} ]; then 
                mkdir ${process.env.FILE_PATH}/storage/${path}
                fi
                `, (err, stdout, stderr) => {
                        if (err) {
                            //some err occurred
                            console.error(err)
                        } else {
                            // the *entire* stdout and stderr (buffered))
                            console.log(`stdout: ${stdout}`);
                            console.log(`stderr: ${stderr}`);

                        }
                    })
                    exec(`cp ${process.env.FILE_PATH}/storage/all/"${media[i].filename}" ${process.env.FILE_PATH}/storage/${path}/`, (err, stdout, stderr) => {
                        if (err) {
                            //some err occurred
                            console.error(err)
                        } else {
                            // the *entire* stdout and stderr (buffered)
                            console.log(`stdout: ${stdout}`);
                            console.log(`stderr: ${stderr}`);
                        }
                    })
                }
                else {
                    exec(`ssh lg${media[i].screen} "if [ ! -d ${process.env.SLAVE_STORAGE}/${path} ]; then 
                mkdir ${process.env.SLAVE_STORAGE}/${path}
                fi"`, (err, stdout, stderr) => {
                        if (err) {
                            //some err occurred
                            console.error(err)
                        } else {
                            // the *entire* stdout and stderr (buffered)
                            console.log(`stdout: ${stdout}`);
                            console.log(`stderr: ${stderr}`);
                        }
                    })
                    exec(`scp ${process.env.FILE_PATH}/storage/all/"${media[i].filename}" lg${media[i].screen}:${process.env.SLAVE_STORAGE}/${path}/`, (err, stdout, stderr) => {
                        if (err) {
                            //some err occurred
                            console.error(err)
                        } else {
                            // the *entire* stdout and stderr (buffered)
                            console.log(`stdout: ${stdout}`);
                            console.log(`stderr: ${stderr}`);
                        }
                    })

                }

            }
        }

    },
    deleteMediaFromLG: function () {
        console.log('DELETE ALL MEDIA RELATED TO THAT PRESENTATION')
    },
    updateMediaInLG: function (data) {
        console.log('UPDATE', data)
    }
}

function cropImageInTwoAndSave(leftScreen, rightScreen, file_path, file_name) {
    var leftDest, rightDest

    if (leftScreen != 1) 
        leftDest = `${process.env.SLAVE_STORAGE}/${file_path}`
    else
        leftDest = `${process.env.FILE_PATH}/storage/${file_path}`
    if (rightScreen != 1) 
        rightDest = `${process.env.SLAVE_STORAGE}/${file_path}`
    else
        rightDest = `${process.env.FILE_PATH}/storage/${file_path}`

    exec(`ssh lg${leftScreen} "if [ ! -d ${leftDest} ]; then 
        mkdir ${leftDest}
        fi"`, (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err)
        } else {
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        }
    })
    exec(`ssh lg${rightScreen} "if [ ! -d ${rightDest} ]; then 
            mkdir ${rightDest}
            fi"`, (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err)
        } else {
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        }
    })

    //crop image and send to created storage
    exec(`${process.env.FILE_PATH}/api/parser/scripts/cropImage2.sh ${leftScreen} ${rightScreen} ${process.env.FILE_PATH}/storage/all/${file_name} ${file_name} ${leftDest} ${rightDest}`, (err, stdout, stderr) => {
        if (err) {
            console.log('ERR', err)
        }
        else {
            console.log('stdout', stdout)
            console.log('stderr', stderr)
        }
    })
}