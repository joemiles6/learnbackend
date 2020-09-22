const jwt = require("jsonwebtoken")
const User = require("../model/userSchema")

 const isAuth = async function (req, res, next) {
    const token = req.get('Authorization')
    // replace Bearer with ''
    const token_new = token.replace('Bearer ', '')
    // TRY CATCH token
    try { 
        let decoded
        decoded =  jwt.verify(token_new, 'mybigtimesecrect')
        const user = await User.findById(decoded.id)
        if (!decoded || user === null) {
         req.isAuth = false
         throw new Error()
        }
        req.isAuth = true
        req.userId = decoded.id
        return next()
    }catch (err) {
      res.status(500).send({error: 'Unauthorized'})
    }
}
module.exports = isAuth