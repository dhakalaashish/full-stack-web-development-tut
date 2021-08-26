//tags
//      <%    'Scriptlet' tag, for control-flow, no output
//      <%_    'Whitespace Slurping' Scriptlet tag, strips all whitespace before it
//      <%=    Outputs the value in the template (HTML escaped) -- basially the html will not be ran
//      <%-      Outputs the unescaped value into the template -- basically the html will be ran
//      <%#     Comment tag, no execution, no output
//      <%%     Outputs a literal '<%'
//      %>      Plain ending tag
//      -%>     Trim-mode ('newline slurp') tag, trims following newline
//      _%>     'Whitespace Slurping' ending tag, removes all whitespace after it


//we can use <%=  write javascript code here %> in home.ejs page to output it in the file, after the javascript is
//read 


const express = require('express')
const app = express()
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10)
    //we made a random.ejs html template file, which is located inside of views directory!
    // res.render('random.ejs', { rand: num })
    //whatever num is will be available in my template( in this case random.ejs) under the name "rand"
    //in other words, i will have access to a variable called rand in my random.ejs file
    //or we can also do:
    res.render('random.ejs', { num })
    //here key and the value is the same, which is usually the norm
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.render('subreddit', { subreddit })
})

app.listen(5000, () => {
    console.log('Server listening on port 5000')
})