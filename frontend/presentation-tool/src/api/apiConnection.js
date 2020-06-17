const axios = require('axios')

export default {
    executePresentation: async (payload) =>{
        axios.get(`${process.env.VUE_APP_API_URL}/presentation/execute/${payload}`)
        .then((res) =>{
            console.log('Success: ',res)
        })
        .catch((err) =>{
            console.log('Error: ',err)
        })
    },
    createPresentation: async (payload) =>{
        axios.post(`${process.env.VUE_APP_API_URL}/presentation/create`,payload)
        .then((res) =>{
            console.log('Success: ',res)
        })
        .catch((err) =>{
            console.log('Error: ',err)
        })
    },
    updatePresentation: async (payload) =>{
        axios.patch(`${process.env.VUE_APP_API_URL}/presentation/update`,payload)
        .then((res) =>{
            console.log('Success: ',res)
        })
        .catch((err) =>{
            console.log('Error: ',err)
        })
    },
    deletePresentation: async (payload) =>{
        axios.delete(`${process.env.VUE_APP_API_URL}/presentation/delete/${payload}`)
        .then((res) =>{
            console.log('Success: ',res)
        })
        .catch((err) =>{
            console.log('Error: ',err)
        })
    },
    getAllPresentation: async () =>{
        let results = []
        axios.get(`${process.env.VUE_APP_API_URL}/presentation/getall`)
        .then((res) =>{
            console.log('Success: ',res)
            results = res
        })
        .catch((err) =>{
            console.log('Error: ',err)
        })

        return results
    },
    uploadMedia: async (payload) => {
        axios.post(`${process.env.VUE_APP_API_URL}/storage/upload`,payload)
        .then((res) =>{
            console.log('Success: ',res)
        })
        .catch((err) =>{
            console.log('Error: ',err)
        })
    },
    cleanStorage: async () =>{
        axios.get(`${process.env.VUE_APP_API_URL}/storage/clean`)
        .then((res) =>{
            console.log('Success: ',res)
        })
        .catch((err) =>{
            console.log('Error: ',err)
        })
    }

}