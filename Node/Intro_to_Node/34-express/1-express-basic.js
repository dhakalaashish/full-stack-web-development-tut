const express = require('express')
const app = express()

app.use((req, res) => {
    console.log('We got a request!')
    res.send('<h1>Hello <i>hi</i> ello </h1>')
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})