const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true})) //extended allows you to send big data
app.use(bodyParser.json())

// configuration of the response headers
app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept,Authorization')
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

// routes
const presentationRoutes = require('./api/routes/presentation')
const storageRoutes = require('./api/routes/storage')
const shareRoutes = require('./api/routes/share')
app.use('/presentation',presentationRoutes)
app.use('/storage',storageRoutes)
app.use('/share',shareRoutes)

app.get('/',(req,res,next)=>{res.json('Welcome to Liquid Galaxy Presentation Tool!')})


// couldn't find a route
app.use((req,res,next) =>{
    const error = new Error('Route not found')
    error.status = 404
    next(error)
})

// handles all errors from other places that weren't treated
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            code: error.status,
            msg: error.message
        }
    })
})

module.exports = app