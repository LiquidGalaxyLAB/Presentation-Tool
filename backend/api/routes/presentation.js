const parser = require('../parser/main')

const express = require('express')
const router = express.Router()

// execute
router.get("/execute/:id", (req, res, next) => {

    callParser().then(() => {
        res.json(`Hello World`)
    })

})

// get all
router.get("/getall", (req,res,next) =>{
    //gets all saved presentations from the database
})

// create
router.post("/create", (req, res, next) =>{
    //receives the json with the info and calls the functions to save in db and save on the lg and storage
})

// delete
router.delete("/delete/:id", (req, res, next) =>{
    //receives presentation id, calls functions to delete from db and from all machines and storage
})


module.exports = router

// helper functions
async function callParser() {
    return await parser.executeScript()
}