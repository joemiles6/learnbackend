const User =require("../model/userSchema")
// create cookie


const Login = async function (req, res) {
//   get Valid user input fields
    const email = req.body.email
    const password = req.body.password
  try {
    User.findByCredentials(email, password).then((data) => {
      data.generateToken()
      data.password = null
      res.status(200).send({data})
    }).catch(err => {
      res.status(404).send({error: err.message})
    })
    } catch (err) {
      res.status(500).send({error: 'Unable to login'})
    }
}
const Signup = async function (req, res) {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
  
       const data = {
           email,
           username,
           password
       } 
       try {
        User.signupUser(email, username ).then(async () => {
          const user  = new User(data)
          await user.generateToken()
          user.save()
          // user.password = null
          res.status(200).send(user)
       }).catch (err => {
        res.status(404).send({error: err.message})
      // res.send(err.message)

       })
      }catch (err){
      res.status(500).send({error: 'Unable to login'})
      }
}
const getUser = async function (req, res) {
  try {
    const user = await User.findById(req.userId)
    user.password = null
    res.status(200).send(user)
  }catch(err) {
    res.status(500).send(err)
  }
}
const useer = async function (req, res) {
  res.status(200).send('user')
}
module.exports = {Login, Signup, getUser,useer}   