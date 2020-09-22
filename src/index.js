const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cors = require('cors')
// connect mongo
mongoose.connect("mongodb+srv://joestack:joestack@cluster0.dm0n9.mongodb.net/<learncplus>?retryWrites=true&w=majority", {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true}).catch((err) => {
    console.log(err)
})

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const isAuth = require("./auth/authentication")
const controller = require('./controller/user')

app.post('/user/login', controller.Login);
app.post('/user/signUp', controller.Signup);
app.get('/user/getUser', isAuth, controller.getUser);

// handle production

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'))

    // handle spa 
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}


app.listen({ port: process.env.PORT || 3000 }, () => {
    console.log(`🚀 Server ready at port 3000`);
  }); 

