module.exports = {
    createPresentation: function(presentation){
        console.log('CREATE INTO MONGO DB',presentation)

    },
    deletePresentation: function(id){
        console.log('DELETE FROM MONGO',id)
    },
    updatePresentation: function(data){
        console.log('UPDATE DOC IN MONGO',data)
    },
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