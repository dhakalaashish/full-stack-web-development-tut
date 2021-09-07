//Express Middleware are functions that run during the request/response lifecycle!
//app.use(express.urlencoder()) or app.use(express.static('./public))

//Middleware functions are functions that have access to the request object (req). the response object(res), and the next
//middleware function in the application's request-response cycle.

//Middleware are just functions
//Each middleware has access to the request and response objects
//Middleware can end the HTTP request by sending back a response with methods like res.send()
//OR middleware can be chained together, one after another by calling next();

//Morgan
//very useful when developing as it helps it in debugging

const express = require('express')
const app = express()
const morgan = require('morgan')

//this tells express to use morgan('tiny') in every single request!
app.use(morgan('dev'))
//function signature for defining middleware --- the function will have req,res and next parameters-
//morgan is actually loggin information about the incoming request!

app.use((req, res, next) => {
    req.requestTime = Date.now();
    //now in every single one of the request handlers we have access to req.requestTime
    console.log(req.method, req.path)
    next()
})
//if i don't pass in a path for app.use(path, function), then the function will run in every event handlers
//but by passing in a path before it we are saying how the function will only be called for specific paths!
app.use('/dogs', (req, res, next) => {
    console.log('I love dogs@@@')
})

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    //req.requestTime can be accessed here!
    res.send('Home')
})
app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('Woof')
})
//if nothing else was matched we will do a app.use to make a 404 page thingy!
app.use((req, res) => {
    res.status(404).send('Not found')
})
app.listen(3000, () => {
    console.log('Server listening on port 3000')
})