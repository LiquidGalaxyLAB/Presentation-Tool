const { exec } = require('child_process')
var fs = require('fs')

module.exports = {
    execPresentation: function(id){
        console.log('EXEC ',id)
        /*exec(`${process.env.FILE_PATH}/api/parser/scripts/test.sh`, (err, stdout, stderr) => {
            if (err) {
                //some err occurred
                console.error(err)
            } else {
                // the *entire* stdout and stderr (buffered)
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
            }
        })*/
    },
    flyTo:function(destination){
        fs.writeFile(`/tmp/query.txt`,`search=${destination}`, (err)=>{
            if(err){
                console.log('Error on writing query.txt')
                throw err
            }
            console.log('File query.txt written with success!', destination)
            
        })
    }
}