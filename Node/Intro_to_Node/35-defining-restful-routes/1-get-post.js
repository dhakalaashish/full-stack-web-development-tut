//see getpost.html
//get --- used to retrieve information, data is sent via query string, information is plainly visible in the URL
//and limited amount of data can be sent(about 1024 characters)
//post ----used to post data to the server, used to write/create/update, data is sent via request body, not a query
//string!, can send any sort of data (JSON, URLencoded)

const express = require('express')
const app = express()
//express.urlencoded is what we use if we are parsing data from a form
app.use(express.urlencoded({ extended: true }))
//express.json() is what we use when we are parsin raw data in the form of JSON!
app.use(express.json())

app.get('/tacos', (req, res) => {
    console.log(req.query)
    const { meat, qty } = req.query
    res.send(`You got ${qty} quantity of ${meat}`)
})

app.post('/tacos', (req, res) => {
    console.log(req.body)
    const { meat, qty } = req.body
    res.send(`You posted ${qty} quantity of ${meat}`)
})
//req.body ---- contains key-value pains of data submitted in the request body. By default, it is undefined, and it is 
//populated when you use body-parsing middleware such as express.json() or express.urlencoded()

app.listen(5000, () => {
    console.log('Server listening on port 5000')
})