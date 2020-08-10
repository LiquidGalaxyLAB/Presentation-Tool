const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

// swagger basic information object
const swaggerOptions = {
    swaggerDefinition: {
        info:{
            title:"Presentation Tool API",
            description: "The API idea is to propose the execution of different types of media at the same time using multiple processing with bash to show big chunks of data at the same time and alongside Google Earth and other applications. These media can be grouped in what we call a Presentation. \n\nA Presentation is a set of configurations users can save on Liquid Galaxy to programatically open media in different positions, screens and time. \n\nEach presentation contains its basic information (like name, description, audio and category) and its slides. Just like in a presentation tool, users can create slides. Each slide has a duration, an its order of execution, so users know when it's going to be executed and for how long. Inside the slides users can add different media (images, videos, audio and sync with Google Earth by using the fly to operation). \n\nThe API has a set of managing presentation functionalities, from execute and stop to read,create,edit,delete,import and export.",
            contact:{
                name: "Karine Aparecida Pistili Rodrigues",
                url:"https://www.linkedin.com/in/karine-pistili/",
                email:"karine.pistili@gmail.com",
            },
            version:"1.0.0",
            license:{
                name: "Apache 2.0",
                url: "https://www.apache.org/licenses/LICENSE-2.0.html"
            }
        },
        servers:[`http://localhost:${process.env.PORT}`]
    },
    basePath:'/',
    apis:['./api/routes/*.js']
}

app.use(bodyParser.urlencoded({ extended: true })) //extended allows you to send big data
app.use(bodyParser.json())

// configuration of the response headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type,Accept,Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

// swagger route configuration in /api-docs + setting up swaggerUI
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs))

// routes
const presentationRoutes = require('./api/routes/presentation')
const storageRoutes = require('./api/routes/storage')
const shareRoutes = require('./api/routes/share')
const demoRoute = require('./api/routes/demo')
app.use('/presentation', presentationRoutes)
app.use('/storage', storageRoutes)
app.use('/share', shareRoutes)
app.use('/demo',demoRoute)

// users that connect to / to /api-docs
app.get('/', (req, res, next) => { 
    res.redirect(301,`/api-docs`) 
})

// couldn't find a route
app.use((req, res, next) => {
    const error = new Error('Route not found')
    error.status = 404
    next(error)
})

// handles all errors from other places that weren't treated
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            code: error.status,
            msg: error.message
        }
    })
})

module.exports = app