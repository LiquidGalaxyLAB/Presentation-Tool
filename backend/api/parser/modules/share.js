const database = require('./database')
const archiver = require('archiver')
var fs = require('fs')

module.exports = {
    exportPresentation: async function (id) {
        //get the json from the db
        console.log('id', id)
        var p = await database.getPresentationById(id)
        var presentationJSON = JSON.stringify(p[0])
        console.log('presentation', presentationJSON)

        return new Promise((resolve, reject) => {
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
                resolve({status:200, path: output.path})
            });

            // This event is fired when the data source is drained no matter what was the data source.
            // It is not part of this library but rather from the NodeJS Stream API.
            // @see: https://nodejs.org/api/stream.html#stream_event_end
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
            //TO DO

            // finalize the archive (ie we are done appending files but streams have to finish yet)
            // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
            archive.finalize();
        })
    },
    importPresentation: function () {
        return { status: 200, msg: "Import" }
    }
}