const axios = require('axios')

export default {
    executePresentation: async (payload) => {
        return new Promise((resolve, reject) => {
            axios.get(`http://${process.env.VUE_APP_LG_IP}:${process.env.VUE_APP_LG_PORT}/presentation/execute/${payload}`)
                .then((res) => {
                    console.log('Response: ', res.data)
                    resolve(res.data)
                })
                .catch((err) => {
                    console.log('Error: ', err)
                    reject(err)
                })
        })

    },
    createPresentation: async (payload) => {
        return new Promise((resolve, reject) => {
            axios.post(`http://${process.env.VUE_APP_LG_IP}:${process.env.VUE_APP_LG_PORT}/presentation/create`, payload)
                .then((res) => {
                    console.log('Response: ', res.data)
                    resolve(res.data)
                })
                .catch((err) => {
                    console.log('Error: ', err)
                    reject(err)
                })
        })

    },
    updatePresentation: async (payload) => {
        return new Promise((resolve, reject) => {
            axios.patch(`http://${process.env.VUE_APP_LG_IP}:${process.env.VUE_APP_LG_PORT}/presentation/update`, payload)
                .then((res) => {
                    console.log('Response: ', res.data)
                    resolve(res.data)
                })
                .catch((err) => {
                    console.log('Error: ', err)
                    reject(err)
                })
        })

    },
    deletePresentation: async (payload) => {
        return new Promise((resolve, reject) => {
            axios.delete(`http://${process.env.VUE_APP_LG_IP}:${process.env.VUE_APP_LG_PORT}/presentation/delete/${payload}`)
                .then((res) => {
                    console.log('Response: ', res.data)
                    resolve(res.data)
                })
                .catch((err) => {
                    console.log('Error: ', err)
                    reject()
                })
        })
    },
    getAllPresentation: async () => {
        let results = []

        return new Promise((resolve, reject) => {
            axios.get(`http://${process.env.VUE_APP_LG_IP}:${process.env.VUE_APP_LG_PORT}/presentation/getall`, { crossdomain: true })
                .then((res) => {
                    console.log('Response: ', res.data)
                    results = res.data
                    resolve(results)
                })
                .catch((err) => {
                    console.log('Error: ', err)
                    reject(err)
                })
        })
    },
    uploadMedia: async (payload) => {
        console.log('payload', payload)
        var bodyFormData = new FormData()

        payload.media.forEach(m => {
            bodyFormData.append(`media`, m);
        });
        /*payload.screens.forEach(s =>{
            bodyFormData.append(`screens`, s);
        })*/
        bodyFormData.append(`screens`, JSON.stringify(payload.screens));
        bodyFormData.append('storagepath',payload.storagepath)
        
        return new Promise((resolve, reject) => {
            axios.post(`http://${process.env.VUE_APP_LG_IP}:${process.env.VUE_APP_LG_PORT}/storage/upload/`, bodyFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                .then((res) => {
                    console.log('Response: ', res.data)
                    resolve(res.data)
                })
                .catch((err) => {
                    console.log('Error: ', err)
                    reject(err)
                })
        })
    },
    cleanStorage: async () => {
        return new Promise((resolve, reject) => {
            axios.get(`http://${process.env.VUE_APP_LG_IP}:${process.env.VUE_APP_LG_PORT}/storage/clean`)
                .then((res) => {
                    console.log('Response: ', res.data)
                    resolve(res.data)
                })
                .catch((err) => {
                    console.log('Error: ', err)
                    reject(err)
                })
        })

    },
    stopPresentation: async () => {
        return new Promise((resolve, reject) => {
            axios.get(`http://${process.env.VUE_APP_LG_IP}:${process.env.VUE_APP_LG_PORT}/presentation/stop`)
                .then((res) => {
                    console.log('Response: ', res.data)
                    resolve(res.data)
                })
                .catch((err) => {
                    console.log('Error: ', err)
                    reject(err)
                })
        })
    }

}