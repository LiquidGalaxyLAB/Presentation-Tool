const storage = require('../parser/modules/storage')
const execute = require('../parser/modules/execute')
const database = require('../parser/modules/database')

module.exports = {
    executePresentation: async function (id) {
       var p = await database.getPresentationById(id)
       if(p.length != 0){
        execute.execPresentation(p[0])
       }
    },
    mediaStorage: function (media, path) {
        storage.sendMediaToDefinedLG(media,path)
    },
    createPresentation: function (presentation){
        database.createPresentation(presentation)
    },
    deletePresentation:async function(id){
        var p = await database.getPresentationById(id)
        storage.deleteMediaFromLG(p[0])
        database.deletePresentation(id)
    },
    updatePresentation: function(data){
        database.updatePresentation(data)
    },
    getAllPresentations: function (){
        return database.getAllPresentations()
    },
    stopPresentation: function(){
        execute.stop()
    }

}
