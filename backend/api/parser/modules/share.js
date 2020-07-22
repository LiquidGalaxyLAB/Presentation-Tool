const database = require('./database')
const archiver = require('archiver')
var fs = require('fs')
const { exec } = require('child_process')

module.exports = {
    exportPresentation: async function (id) {
        var p = await database.getPresentationById(id)
        var presentationJSON = JSON.stringify(p[0])

        return new Promise((resolve, reject) => {
            return new Promise((resolve, reject) => {
                console.log('Download')

                // get all folders from the slaves and store temporarily 
                exec(`${process.env.FILE_PATH}/api/parser/scripts/exportMediaFromSlaves.sh ${p[0].maxscreens} "${process.env.SLAVE_STORAGE}/${p[0].id}" "${process.env.FILE_PATH}/storage/all" `, (err, stderr, stdout) => {
                    if (err) {
                        console.log("Error on retriving media from slaves", err)
                        reject()
                    }
                    else {
                        console.log("SUCCESS", stdout)
                        resolve()
                    }
                })
            })
                .then(() => {
                    console.log('save in the archive')
                    //configure the archiver 
                    // create a file to stream archive data to.
                    var output = fs.createWriteStream(`${process.env.FILE_PATH}/storage/all` + `/${p[0].title}.zip`);
                    var archive = archiver('zip', {
                        zlib: { level: 9 } // Sets the compression level.
                    })
                    // listen for all archive data to be written
                    // 'close' event is fired only when a file descriptor is involved
                    output.on('close', function () {
                        console.log(archive.pointer() + ' total bytes');
                        console.log('archiver has been finalized and the output file descriptor has closed.');
                        resolve({ status: 200, path: output.path, maxscreens: p[0].maxscreens })
                    });

                    // This event is fired when the data source is drained no matter what was the data source.
                    output.on('end', function () {
                        console.log('Data has been drained');
                    });

                    // good practice to catch warnings (ie stat failures and other non-blocking errors)
                    archive.on('warning', function (err) {
                        if (err.code === 'ENOENT') {
                            // log warning
                            console.log('warning', err)
                        } else {
                            // throw error
                            throw err;
                        }
                    });

                    // good practice to catch this error explicitly
                    archive.on('error', function (err) {
                        throw err;
                    });

                    // pipe archive data to the file
                    archive.pipe(output);

                    // append a file from string - presentation obj to a JSON file
                    archive.append(presentationJSON, { name: 'presentation.json' });

                    // append files from a sub-directory and naming it `screen n` within the archive
                    //for lg1
                    archive.directory(`${process.env.FILE_PATH}/storage/${p[0].id}`, 'lg1-media')

                    //for other screens
                    for (var i = 1; i <= p[0].maxscreens; i++) {
                        if (i != 1) {
                            archive.directory(`${process.env.FILE_PATH}/storage/all/${i}-media`, `lg${i}-media`)
                        }
                    }

                    // finalize the archive (ie we are done appending files but streams have to finish yet)
                    // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
                    archive.finalize();
                })
                .catch(() => {
                    console.log('Error')
                })
        })
    },
    importPresentation: function (filename) {
        console.log('FILENAME', filename)

        //create temporary folder to store the the unzipped files
        exec(`mkdir ${process.env.FILE_PATH}/storage/all/tmp`)

        //unzip received presentation
        exec(`unzip ${process.env.FILE_PATH}/storage/all/${filename} -d ${process.env.FILE_PATH}/storage/all/tmp`, (err, stdout, stderr) => {
            if (err) {
                console.log('err', err)
                console.log('stderr', stderr)
            }
            else {
                console.log('stodout', stdout)
            }
        })

        //TODO
        //read presentation.json and save its info to the db

        //get the media information from each screen and save on the correct places

        //delete the tmp folder and its contents 

        //delete the .zip inside the storage/all/


        return { status: 200, msg: "Presentation imported with success!" }
    },
    deleteTempExportedFiles : function (pathToZip,maxscreens){
        // delete zip
        exec(`rm '${pathToZip}'`, (err, stdout, stderr) => {
            if (err) {
                console.log('Error on deleting tmp .zip', stderr, err)
            }
            else{
                console.log('Success on deleting tmp .zip',stdout)
            }
        })
        
        // delete slaves storage copy
        for(var i = 1; i <= maxscreens; i++){
            if(i != 1){
                exec(`rm -rf ${process.env.FILE_PATH}/storage/all/${i}-media`, (err, stdout, stderr) =>{
                    if (err) {
                        console.log('Error on deleting tmp files', stderr, err)
                    }
                    else{
                        console.log('Success on deleting tmp files',stdout)
                    }
                })
            }
        }
    }
}