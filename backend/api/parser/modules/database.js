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
    deletePresentation: async function(id){
        var response
        const res = await Presentation.deleteOne({_id: id})

        if(res.ok != 1){
            response = {status: 500, msg: `Internal Server Error. A problem occurred with the database`}
        }
        else if(res.deletedCount == 0 ){
            response = {status: 404, msg: `Not found. Document not found ${id}`}
        }
        else{
            console.log('Document deleted with success', id)
            response = {status: 200, msg: `Success. Document ${id} deleted with`}
        }

        return response
    },
    // Updates a document into the presentations collection
    updatePresentation: async function(obj){
        Presentation.updateOne({_id: obj.id},{ $set : obj.data}, (err) =>{
            if(!err){
                console.log('Document updated with success')
            }
            else{
                console.log('Unable to update document')
            }
        } )
    },
    // Gets a presentation by ID from the presentations collection 
    getPresentationById: async function(id){
        const document = await Presentation.find({_id:id})
        var response

        if(document.length == 0){
            console.log('Document not found')
            response =  {status: 404, msg: `Not found. Document ${id} not found`}
        }
        else{
            console.log('Retrieved doc with success',document)
            response =  document
        }
        
        return response
    },
    // Gets all documents from the presentations collection
    getAllPresentations: async function(){
        const array = await Presentation.find({})
        console.log('Retrieved all docs with success',array)

        return array
    }
}