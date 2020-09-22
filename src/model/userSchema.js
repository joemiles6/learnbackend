const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const User = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    token: String,
})

User.methods.generateToken = async function  (req, res, next) {
    const user = this
    try {
        let token  = jwt.sign( {id: user._id}, "mybigtimesecrect")
        user.token = token
    } catch (err) {
        res.status(500).send(err)
    }
}
User.statics.signupUser = async function (email, username, password) {
    const isEmail = await user.findOne({email})
    const isUsername = await user.findOne({username})

        if (isEmail){
          throw new Error('email has been used')
        }
        if (!email.includes('.com') || email.includes(' ') ) {
            throw new Error('Email not valid ')
        }
        if (isUsername || email === username || username.includes('@')) {
          throw new Error('username has been or invalid ')
        }

}

// dont send password
User.statics.findByCredentials = async function  (email, password) {
    const isEmail = await user.findOne({email})
    if (!isEmail) {
      throw new Error(email + ", this Email does not exist.")
    }
    const isMatch = await bcrypt.compare(password, isEmail.password)
    if (!isMatch) {
    throw new Error("password is not correct!")
    }
    return isEmail
}
User.pre('save', async function(next){
    const user =  this
    console.log(this.password)
    if (!user.isModified("password")) {next()}
     const hashPassword = await bcrypt.hash(user.password, 8)
     try {
         user.password = hashPassword
         next()
     }catch (err) {
        return next(err)
     }
 })

const user = mongoose.model('user', User)
module.exports = user