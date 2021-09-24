const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('connect-flash')

//warning, the default server-side session storage is MemoryStore, which is proposely not
//designed for a production environment. It will leak memory under most conditions, does
//not scale past a single process, and is meant for debugging and developing.
//That's why we must use one of many different compatible session stores! We can use a
//redis adapter, or even mongo during production!

app.use(session({
    secret: 'thisisnotagoodsecret',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
//flash---------------------npm install connect-flash
//the flash is a special area of the session used for storing messages. Messages are
//written to the flash and cleared after being displayed to the user. The flash is 
//typically used in combination with redirects, ensuring that the message is available
//to the next page that is to be rendered!


app.use((req, res, next) => {
    res.locals.messages = req.flash('success')
    next()
})
//res.locals
//is an object that contains response local vairables scoped to the request
//and therefore available only to the view(s) rendered during the req/res
//cycle (if any). This property is useful for exposing request-level information
//such as the request path name, authenticated user, user settings, and so on.


app.get('/viewcount', (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`you have viewed this page ${req.session.count} times`)
})

app.get('/register', (req, res) => {
    const { username = 'Anonymous' } = req.query
    req.session.username = username;
    res.redirect('/greet')
})

app.get('/greet', (req, res) => {
    const { username } = req.session;
    res.send(`Welcome back, ${username}`)
})


app.get('/flash', (req, res) => {
    req.flash('success', 'Successfully done something!')
    res.redirect('/redirectroute')
})
app.get('/redirectroute', (req, res) => {
    res.render('template.ejs', { messages: req.flash('success') })
})
//we can also use a middleware instead of the above route
app.get('/usingmiddleware', (req, res) => {
    res.render('template.ejs')
})
//above we didn't have to pass in the messages, in the rendering, as 
//we already used a middleware using res.locals!!

app.listen(5000, () => {
    console.log('Server Listening on port 5000')
})