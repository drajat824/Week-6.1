require('dotenv').config()
module.exports = async (req, res, next) => {
    const token = req.header('auth')
    if(token) {
    const jsonwebtoken = require('jsonwebtoken');
    const decode = jsonwebtoken.verify(token, process.env.SECRET_KEY)
    console.log(decode)
    req.auth = decode.status
    next()

    } else {
        next()
    }

}