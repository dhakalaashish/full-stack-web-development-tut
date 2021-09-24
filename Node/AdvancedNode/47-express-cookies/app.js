const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser('thisismysecret'))
//the above argument is going to be used by cookie-parser to sign our cookies if specified
//and then to verify the integrity of the cookie!

app.get('/greet', (req, res) => {
    const { name = 'anonymous', age } = req.cookies
    const { fruit } = req.signedCookies
    res.send(`Hello ${name}, ${age} years old can have this ${fruit}.`)
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'Chaitanya Dhungana')
    res.cookie('age', '19')
    res.send('Okay sent you a cookie!')
})

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'apple', { signed: true })
    res.send('Cookie has been signed to be true')
})

app.listen(5000, () => {
    console.log('Serving on Port 5000')
})