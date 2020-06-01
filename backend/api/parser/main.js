const { exec } = require('child_process')
const storage = require('../parser/modules/storage')
const execute = require('../parser/modules/execute')

module.exports = {
    executeScript: function () {
        execute.executeScript()
    },
    mediaStorage: function (media, path) {
        storage.sendMediaToDefinedLG(media,path)
    }

}
