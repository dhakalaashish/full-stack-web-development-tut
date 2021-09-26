//Authentication
//-->Authentication is the process of verifying who a particular user is. We typically authenticate with a username/password
//but we can also use security questions, facial recognition, etc.

//Authorization
//--> Authorization is verifying what a specific user has access to. Generally, we authorize after a user has been authenticated.
//"Now that we know who you are, here is what you are allowed to do and NOT to do"

//do not store passwords
//Rather than storing a password in the database, we run the password through a hashing function first and then store the result
//in the database.

//Hashing functions
//Hashing functions are functions that map input data of some arbitary size to fixed output values.

const express = require('express')
const app = express()
const User = require('./models/user')
const ejs = require('ejs')
const path = require('path')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const session = require('express-session')

main().then(data => console.log('Database connected')).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/authDemo');
}

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'notagoodsecret',
    resave: false,
    saveUninitialized: false,
}))

//middleware for protecting routes, so login before viewing!

const requireLogin = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login')
    }
    next()
}

app.get('/', (req, res) => {
    res.send('This is the homepage')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})
app.post('/register', async (req, res) => {
    const { username, password } = req.body
    const user = new User({ username, password })
    await user.save();
    req.session.userId = user._id
    res.redirect('/')
})

app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const foundUser = await User.findAndValidate(username, password)
    //somehow this doesn't work, because node cannot find the findAndValidate statics function in userSchema
    if (foundUser) {
        req.session.userId = foundUser._id
        res.redirect('/secret')
    } else {
        res.redirect('/login')
    }
})
app.get('/secret', requireLogin, (req, res) => {
    res.render('secret.ejs')
})

app.post('/logout', (req, res) => {
    // req.session.userId = null
    //above code only makes one property into null, but the code below destroys everything in the session
    //destroy() is only used in session if everything in the session is to be deleted!
    req.session.destroy()
    res.redirect('/login')
})
app.listen(3000, () => {
    console.log("Serving at port 3000")
})