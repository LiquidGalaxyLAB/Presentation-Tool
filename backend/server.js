require('dotenv').config()
require('./database/main')
const http = require('http')
const port = process.env.PORT || 3000
const app = require('./index')

const server = http.createServer(app)

server.listen(port)