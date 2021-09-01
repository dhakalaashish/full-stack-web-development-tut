//*******************all require**************************** */
//requiring express
const express = require('express')
const app = express()
//requiring path
const path = require('path')
//requiring ejs
let ejs = require('ejs')
//requiring mongoose model from groceryMongoose.js file
const Grocery = require('./groceryMongoose.js')
//requiring method-override
const methodOverride = require('method-override')

// ********************all middleware**************************
//setting viewengine as ejs and setting a path for it!
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//***********************using app.method****************** */
//show index
app.get('/grocery', async (req, res) => {
    const weekOneGroceries = await Grocery.find({})
    res.render('index.ejs', { weekOneGroceries })
})
//form to make a new item!
app.get('/grocery/new', (req, res) => {
    res.render('new.ejs')
})
//addressed from the new form
app.post('/grocery', async (req, res) => {
    const data = await new Grocery(req.body)
    data.save()
    res.redirect('/grocery')
})
//this is where the edit from takes the application to!
app.put('/grocery/:id', async (req, res) => {
    const { id } = req.params;
    const updatedItem = await Grocery.findByIdAndUpdate(id, req.body);
    console.log(req.body)
    res.redirect(`/grocery/${id}`)
})
app.delete('/grocery/:id', async (req, res) => {
    const { id } = req.params;
    const deletedItem = await Grocery.findByIdAndDelete(id);
    console.log(deletedItem);
    res.redirect('/grocery')
})
//show each grocery item
app.get('/grocery/:id', async (req, res) => {
    const { id } = req.params;
    const item = await Grocery.findById(id)
    res.render('show.ejs', { item })
})
//takes to the edit form page
app.get('/grocery/:id/edit', async (req, res) => {
    const { id } = req.params;
    const item = await Grocery.findById(id);
    res.render('edit.ejs', { item })
})
app.listen(5000, () => {
    console.log('Server Listening on port 5000');
})