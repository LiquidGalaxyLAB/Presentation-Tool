const storage = require('../parser/modules/storage')
const execute = require('../parser/modules/execute')
const database = require('../parser/modules/database')

module.exports = {
    executePresentation: async function (id) {
        var p = await database.getPresentationById(id)
        if (p.length != 0) {
            execute.execPresentation(p[0])
        }
    },
    mediaStorage: function (media, path) {
        storage.sendMediaToDefinedLG(media, path)
    },
    createPresentation: function (presentation) {
        database.createPresentation(presentation)
    },
    deletePresentation: async function (id) {
        var response
        var p = await database.getPresentationById(id)
        var st_response
        var db_response

        if (p.status != 404 && p.status != 500) {
            st_response = await storage.deleteMediaFromLG(p[0])
            if (st_response != 'ok') {
                response = { status: 500, msg: `Internal Server Error. A problem occurred while deleting from storage` }
            }
            else {
                db_response = await database.deletePresentation(id)
                response = db_response
            }
        }
        else {
            response = p
        }

        return response
    },
    updatePresentation: function (data) {
        database.updatePresentation(data)
    },
    getAllPresentations: function () {
        return database.getAllPresentations()
    },
    stopPresentation: function () {
        execute.stop()
    },
    cleanStorage: function () {
        storage.cleanStorage()
    }

}
