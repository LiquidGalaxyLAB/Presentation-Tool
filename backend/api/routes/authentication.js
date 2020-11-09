const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { generateAccessToken } = require('../parser/modules/authentication')
const auth = require('../parser/modules/authentication')

//This is not a production way of doing things. The correct way is to store the refreshTokens inside a regular db or caching with redis
var refreshTokens = [] 

router.post('/token',(req,res) =>{
  const refreshToken = req.body.token
  if(refreshToken == null) return res.sendStatus(401)
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (err, userId) => {
    if(err) return res.sendStatus(403)
    const accessToken = generateAccessToken(userId)
    res.json({accessToken: accessToken})
  })
})

router.post('/login',(req,res,next) =>{
    if(req.body.user === 'luiz' && req.body.pwd === '123'){  
        //MOCK INFO ABOUT USER
        const id = 1; 
        const accessToken = auth.generateAccessToken(id)
        const refreshToken = auth.generateRefreshToken(id)
       
        //only for example, this needs to be saved in a db or cache service
        refreshTokens.push(refreshToken)
        return res.json({ accessToken: accessToken, refreshToken: refreshToken });
      }
      
      res.status(500).json({message: 'Login inválido!'});
})

router.delete('/logout', function(req, res) {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

module.exports = router