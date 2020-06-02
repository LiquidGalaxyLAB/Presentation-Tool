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
        Presentation.deleteOne({_id: id}, (err) =>{
            if(!err){
                console.log('Document deleted with success', id)
            }
            else{
                console.log('Unable to delete document', err)
            }
        })
    },
    // Updates a document into the presentations collection
    updatePresentation: function(data){
        console.log('UPDATE DOC IN MONGO',data)
    },
    // Gets a presentation by ID from the presentations collection 
    getPresentationById: async function(id){
        const document = await Presentation.find({_id:id})
        console.log('Retrieved doc with success',document)

        return document
    },
    // Gets all documents from the presentations collection
    getAllPresentations: async function(){
        const array = await Presentation.find({})
        console.log('Retrieved all docs with success',array)

        return array
    }
}