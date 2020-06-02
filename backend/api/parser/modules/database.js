var Presentation = require('../../../database/index')

module.exports = {
    // Creates a new document into the presentations collection
    createPresentation: function(presentation){
        var p = new Presentation(presentation)
        p.save().then((success) =>{
            console.log('Document created with succes: ', success)
        })
        .catch((err) =>{
            console.log('Error on creating document: ',err)
        })

    },
    // Deletes a document into the presentations collection
    deletePresentation: function(id){
        console.log('DELETE FROM MONGO',id)
    },
    // Updates a document into the presentations collection
    updatePresentation: function(data){
        console.log('UPDATE DOC IN MONGO',data)
    },
    // Gets a presentation by ID from the presentations collection 
    getPresentationById: function(id){
        console.log('get one')
    },
    // Gets all documents from the presentations collection
    getAllPresentations: function(){
        console.log('GET ALL FROM MONGO',id)

        //testing only
        var array = [
            {oi: "aaaaaaaaaaa"},
            {tchau: "aaaaaaaaaaa"}
        ]
        return array
    }
}