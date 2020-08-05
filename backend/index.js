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
    apis:['./api/routes/presentation.js']
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
app.use('/presentation', presentationRoutes)
app.use('/storage', storageRoutes)
app.use('/share', shareRoutes)

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