// This file is the heart of the parser, all possible functionalities are controlled by this main file

const storage = require('../parser/modules/storage')
const execute = require('../parser/modules/execute')
const database = require('../parser/modules/database')
const share = require('../parser/modules/share')

module.exports = {
    executePresentation: async function (id) {
        var response
        var p = await database.getPresentationById(id)

        if (p.status != undefined) {
            response = p
        }
        else {
            if (p.length != 0) {
                execute.execPresentation(p[0])
                response = {status: 202, msg: 'Accepted. The request has being accepted to start proccessing. Executing presentation.'}
            }
        }

        return response
    },
    mediaStorage: async function (media, path) {
        return await storage.sendMediaToDefinedLG(media, path)
    },
    createPresentation: async function (presentation) {
        return await database.createPresentation(presentation)
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
    updatePresentation: async function (data) {
        return await database.updatePresentation(data)
    },
    getAllPresentations: function () {
        return database.getAllPresentations()
    },
    stopPresentation: async function () {
        return await execute.stop()
    },
    cleanStorage: async function () {
        return await storage.cleanStorage()
    },
    exportPresentation: async function (id){
        return await share.exportPresentation(id)
    },
    importPresentation: async function (filename){
        return await share.importPresentation(filename)
    }

}
