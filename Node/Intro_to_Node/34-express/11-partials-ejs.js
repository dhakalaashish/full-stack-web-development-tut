// partials
// means including templates in other templates!
//we can create sth that all templates can use and add it in our subtemplate!
//basically, I cut all of the head section in an .ejs file and put it in another file named head.ejs inside partials folder
//then we can include that head.ejs in subreddit.ejs file!
// for that we can use <%- include('partials/head.ejs',{user:user}); %>


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

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10)
    let oddOrEven = ''
    if (num % 2 == 0) {
        oddOrEven = 'even'
    } else {
        oddOrEven = 'odd'
    }
    res.render('random.ejs', { num, oddOrEven })
})


app.listen(5000, () => {
    console.log('Server is listening at port 5000')
})