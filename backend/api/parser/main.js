const storage = require('../parser/modules/storage')
const execute = require('../parser/modules/execute')
const database = require('../parser/modules/database')

module.exports = {
    executePresentation: async function (id) {
       var p = await database.getPresentationById(id)
       execute.execPresentation(p[0])
    },
    mediaStorage: function (media, path) {
        storage.sendMediaToDefinedLG(media,path)
    },
    createPresentation: function (presentation){
        database.createPresentation(presentation)
    },
    deletePresentation:function(id){
        database.deletePresentation(id)
        storage.deleteMediaFromLG()
    },
    updatePresentation: function(data){
        database.updatePresentation(data)
        storage.updateMediaInLG(data)
    },
    getAllPresentations: function (){
        return database.getAllPresentations()
    }

}
