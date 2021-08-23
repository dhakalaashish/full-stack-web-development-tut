const express = require('express')
const app = express()

// app.use((req, res) => {
//     console.log('We got a request!')
//     res.send('<h1>Hello <i>hi</i> ello </h1>')
// })

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.get('/cats', (req, res) => {
    res.send('MEOW!')
})
app.post('/cats', (req, res) => {
    res.send('this is different than get request!')
})

app.get('/dogs', (req, res) => {
    res.send('Woof!')
})

app.get('*', (req, res) => {
    res.send(`I don't know that path`)
})




app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})