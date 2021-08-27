//REST
//REpresentational State Transfer
//The main idea of REST is treating data on the server-side as resources that can be CRUDed, basically, created, read,
//updated and deleted. The most common way of approaching REST is by formatting the URLs and HTTP verbs in your applications

//Restful comments basic app---
//base ---------- /comments
//GET               /comments               - list all comments             index route
//GET               /comments/new           -form to create new comment     new route
//POST              /comments               - create a new comment          create route
//GET               /comments/:id           -get one comment (using ID)     show route
//GET               /comments/:id/edit      -form to edit specific comment  edit route
//PUT or PATCH      /comments/:id           - update one comment            update route
//DELETE            /comments/:id           - destroy one comment           destroy route

//requiring express and path
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const path = require('path')
const { v4: uuid } = require('uuid');
uuid();
//uuid
//universally unique identifier -- uuid package
//helps us create unique ids for each comments or data!
//below is the other option, I copied this from stack overflow!
// function uuid() {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//         var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//     });
// }
//using app.use on method-override
app.use(methodOverride('_method'))
//parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//setting view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

let comments = [
    {
        id: uuid(),
        username: 'Aashish',
        comment: "Hey yo! What's up?"
    },
    {
        id: uuid(),
        username: 'Shweta',
        comment: "Babbaaaaaaaal"
    },
    {
        id: uuid(),
        username: 'Darcy',
        comment: "Burpppppp"
    },
    {
        id: uuid(),
        username: 'Maitreya',
        comment: "Naam k ho yar? Paxi lagum!"
    },
    {
        id: uuid(),
        username: 'Saujanya',
        comment: "Naya manga k padhnae yar"
    },
    {
        id: uuid(),
        username: 'Bhatte',
        comment: "Mero bau k 4 crore chornu paryo yaaar"
    },
    {
        id: uuid(),
        username: 'Prativa',
        comment: "I am late! tara ek ghanta ajha nuhaunu xa"
    }
]
//getting the index, basically - index route
app.get('/comments/new', (req, res) => {
    res.render('comments/new.ejs')
})
//form to create new comment - new route
app.get('/comments', (req, res) => {
    res.render('comments/index.ejs', { comments })
})
// create a new comment itself - create route
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments')
    //res.redirect redirects the post to get here..and gives it a status code of 301 then it makes a get request
    //to /comments while we will still get req.body for it from the post request!
})
//show route -- show one unique comment
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    console.log(comment)
    res.render('comments/show', { comment })
})
//edit route ---- form to edit a comment
//normally we cannot have our form use any other method than get or post, but we can use method-override to solve it
//method-override lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
// we have to install it npm i method-override
//there are many ways to use it including by using headers, or by query string, we will do the query string method
//see the docs for method-override in express for detailed information!
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit.ejs', { comment })
})
//update route --- update one comment
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newCommentText;
    //above we updated found comment with newCOmmentText
    res.redirect('/comments')
    //since we don't want to respond a content from a patch or post route so we redirect!
})
//destroy route ---- deletes specific item on the server
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    //comments.filter returns a new array with the filtered items in the array
    res.redirect('/comments')
})
app.listen(5000, () => {
    console.log('Server listening on port 5000')
})
