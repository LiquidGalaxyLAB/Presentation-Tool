const { exec } = require('child_process')

module.exports = {
    executeScript: function () {
        exec(`${process.env.FILES_PATH}/api/parser/scripts/test.sh`, (err, stdout, stderr) => {
            if (err) {
                //some err occurred
                console.error(err)
            } else {
                // the *entire* stdout and stderr (buffered)
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
            }
        })

    },
    sendMediaToLG: function (media, path) {
        for (var i = 0; i < media.length; i++) {
            if (media[i].screen == 1) {
                exec(`if [ ! -d ${process.env.FILES_PATH}/storage/${path} ]; then 
                mkdir ${process.env.FILES_PATH}/storage/${path}
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
                exec(`cp ${process.env.FILES_PATH}/storage/all/${media[i].filename} ${process.env.FILES_PATH}/storage/${path}/`, (err, stdout, stderr) => {
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
                exec(`echo "slave"`, (err, stdout, stderr) => {
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

}
