const parser = require('../parser/main')

const express = require('express')
const router = express.Router()

// just for testing route
router.get("/", (req, res, next) => {

    callParser().then(() => {
        res.json(`Hello World`)
    })

})

module.exports = router

// helper functions
async function callParser() {
    return await parser.executeScript()
}