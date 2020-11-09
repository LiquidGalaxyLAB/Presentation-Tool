var jwt = require('jsonwebtoken')

module.exports = {
    authenticateToken: function (req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null || token == undefined) return res.status(401).json('No Token')

        jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, userId) => {
            if (err) return res.status(403).json('Forbidden')
            req.userId = userId
            next()
        })
    },
    generateAccessToken: function (id) {
        return jwt.sign({ userId: id }, process.env.SECRET_ACCESS_TOKEN, {
            expiresIn: 60 // expires in 1min
        });
    },
    generateRefreshToken: function (id){
        return jwt.sign({ userId: id }, process.env.SECRET_REFRESH_TOKEN);
    }
}