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

const express = require('express')
const app = express()
const path = require('path')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const comments = [
    {
        username: 'Aashish',
        comment: "Hey yo! What's up?"
    },
    {
        username: 'Shweta',
        comment: "Babbaaaaaaaal"
    },
    {
        username: 'Darcy',
        comment: "Burpppppp"
    },
    {
        username: 'Maitreya',
        comment: "Naam k ho yar? Paxi lagum!"
    },
    {
        username: 'Saujanya',
        comment: "Naya manga k padhnae yar"
    },
    {
        username: 'Bhatte',
        comment: "Mero bau k 4 crore chornu paryo yaaar"
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index.ejs', { comments })
})

app.listen(5000, () => {
    console.log('Server listening on port 5000')
})