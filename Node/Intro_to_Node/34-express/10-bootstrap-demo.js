const express = require('express')
const app = express()
const path = require('path')
const redditData = require('./data.json')

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params
    const data = redditData[subreddit]
    if (data) {
        res.render('subreddit.ejs', { ...data })
    } else {
        res.status(404).render('notfound.ejs', { subreddit })
    }
})

app.listen(5000, () => {
    console.log('Server is listening at port 5000')
})