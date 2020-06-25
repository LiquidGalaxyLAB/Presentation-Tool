const axios = require('axios')

export default {
    executePresentation: async (payload) =>{
        return new Promise((resolve, reject) =>{
            axios.get(`http://${process.env.VUE_APP_LG_IP}:${process.env.VUE_APP_LG_PORT}/presentation/execute/${payload}`)
            .then((res) =>{
                console.log('Response: ',res.data)
                resolve(res.data)
            })
            .catch((err) =>{
                console.log('Error: ',err)
                reject(err)
            })
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
        return new Promise((resolve, reject) =>{
            axios.delete(`http://${process.env.VUE_APP_LG_IP}:${process.env.VUE_APP_LG_PORT}/presentation/delete/${payload}`)
            .then((res) =>{
                console.log('Response: ',res.data)
                resolve(res.data)
            })
            .catch((err) =>{
                console.log('Error: ',err)
                reject()
            })
        })    
    },
    getAllPresentation: async () =>{
        let results = []

        return new Promise((resolve, reject) =>{
            axios.get(`http://${process.env.VUE_APP_LG_IP}:${process.env.VUE_APP_LG_PORT}/presentation/getall`, { crossdomain: true })
            .then((res) =>{
                console.log('Response: ',res.data)
                results = res.data
                resolve(results)
            })
            .catch((err) =>{
                console.log('Error: ',err)
                reject(err)
            })
        })
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
        return new Promise((resolve,reject) =>{
            axios.get(`http://${process.env.VUE_APP_LG_IP}:${process.env.VUE_APP_LG_PORT}/storage/clean`)
            .then((res) =>{
                console.log('Response: ',res.data)
                resolve(res.data)
            })
            .catch((err) =>{
                console.log('Error: ',err)
                reject(err)
            })
        })
        
    },
    stopPresentation: async () => {
        return new Promise((resolve,reject) =>{
            axios.get(`http://${process.env.VUE_APP_LG_IP}:${process.env.VUE_APP_LG_PORT}/presentation/stop`)
            .then((res) =>{
                console.log('Response: ',res.data)
                resolve(res.data)
            })
            .catch((err) =>{
                console.log('Error: ',err)
                reject(err)
            })
        })
    }

}