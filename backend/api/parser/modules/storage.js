const { exec } = require('child_process')

module.exports = {
    cropImageInTwo: function(leftScreen,rightScreen,file_path,file_name,folder){
        // checks if file already exists
        exec(`if [ ! -f ${file_path} ]; then 
           bash ${process.env.FILE_PATH}/api/parser/scripts/cropImage2.sh ${leftScreen} ${rightScreen} ${file_path} ${file_name} ${folder}
        fi`,(err, stdout, stderr) => {
            if(err){
                console.log(err)
                console.log(stderr)
            }
            else{
                console.log('stdout',stdout)
            }
        } )

        /*exec(`${process.env.FILE_PATH}/api/parser/scripts/cropImage2.sh ${leftScreen} ${rightScreen} ${file_path} ${file_name} ${folder}`, (err, stdout, stderr) => {
            if(err){
                console.log(err)
                console.log(stderr)
            }
            else{
                console.log('stdout',stdout)
            }
        })*/
    },
    sendMediaToDefinedLG: function (media, path) {
        for (var i = 0; i < media.length; i++) {
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
    },
    deleteMediaFromLG: function () {
        console.log('DELETE ALL MEDIA RELATED TO THAT PRESENTATION')
    },
    updateMediaInLG: function(data){
        console.log('UPDATE',data)
    }
}