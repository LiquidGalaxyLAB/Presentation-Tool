const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken')

router.post('/login',(req,res,next) =>{
    if(req.body.user === 'luiz' && req.body.pwd === '123'){
        
        //MOCK INFO ABOUT USER
        const id = 1; 
        var token = jwt.sign({userId: id}, process.env.SECRET_ACCESS_TOKEN, {
          expiresIn: 60 // expires in 5min
        });
        return res.json({ auth: true, token: token });
      }
      
      res.status(500).json({message: 'Login inválido!'});
})

router.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
})

module.exports = router