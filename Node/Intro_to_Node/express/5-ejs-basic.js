//templating
//templating allows us to define a preset "pattern" for a webpage, that we can dynamically modify.
//For example, we could define a single "Search" template that displays all the results for a given term. We don't
//know what the term is or how many results there are ahead of time. The webpage is created on the fly.

//templating engine used with Express - EJS, handlebars, Nunjucks, etc
//We will use EJS

const express = require('express')
const app = express()

const path = require('path')

//to tell my file to use EJS, we will use app.set(), which accepts two parameters - a key and a value
app.set('view engine', 'ejs')
//we have to npm install ejs, and write the app.set to use ejs, we don't need to require it!
//by default, when we use a view engine, express assumes that our views or templates will be in a directory named views
//then we will make a file named "home.ejs"--can name this whatever we want, inside of views directory
//I can make a normal html page in home.ejs
//now we can send back a file in any app.get, and the method we use "res.render(view[,locals][,callback])"
//res.render => renders a view and sends the rendered HTML string to the client
//we can do "res.render('home.ejs)", but we dont have to use the .ejs as we already mentioned using ejs in the app.set
//if we want to run this code from other directories! it will not work as it will not be able to find views
//to fix this we will use the built-in module --- path
app.set('views', path.join(__dirname, '/views'))
//so, what this does is that the __dirname, which will give us the path to the current working directory will join 
//with '/views' and return a correct path to out views directory, this tells the app.set to look in the correct place.
//path.join method joins all the given path segments together using the platform specific separator as a delimiter,
//then normalizes the resulting path!
//__dirname is the location of the index.html, or this file which is ran with nodemon!

app.get('/', (req, res) => {
    res.render('home.ejs')
    //doesn't matter if we jsut write "home" or "home.ejs", but the view engine must be set to ejs, if latter.
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})