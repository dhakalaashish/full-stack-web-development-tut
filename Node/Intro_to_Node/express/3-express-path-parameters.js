const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params
    res.send(`This is a ${subreddit} subreddit!`)
})
app.get('/r/:subreddit/:postID', (req, res) => {
    const { subreddit, postID } = req.params
    res.send(`<h1> This is a ${subreddit} subreddit for id #${postID}</h1>`)
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