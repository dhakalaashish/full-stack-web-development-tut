const express = require('express')
const app = express()
const path = require('path')
const redditData = require('./data.json')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname, '/public')))

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit]
    if (data) {
        res.render('subreddit.ejs', { ...data })
    } else {
        return res.status(404).render('notfound', { subreddit })
    }
})
// basically we are requiring a data.json file and taking the route params and choosing that from data.json, and then
//we are rendering that subreddit.ejs, while we are also spreading data, so that in the subreddit.ejs file, we can
//automatically use properties of the data object! data, in this case, are each objects in the data.json file object. 

app.listen(5000, () => {
    console.log('Server listening on port 5000')
})