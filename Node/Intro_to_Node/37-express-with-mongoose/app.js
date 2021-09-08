const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const AppError = require('./AppError.js')

const Product = require('./models/product');
const { nextTick } = require('process');

main().then(() => console.log('Mongo Connection Open')).catch(() => console.log('Mongo Connection Error'));
async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/farmStand');
    } catch (e) {
        console.log(`Problem in Mongo ${e}`)
    }
}


app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//fixing the categories thingy!
const categories = ['fruit', 'vegetable', 'dairy', 'fungi'];

//showing all products
app.get('/products', async (req, res) => {
    try {
        const { category } = req.query;
        if (category) {
            const products = await Product.find({ category })
            res.render('products/index', { products, category })
        } else {
            const products = await Product.find({})
            res.render('products/index', { products, category: 'All' })
        }
    } catch (err) {
        console.log(`Error in /products: ${err}`)
    }
})
// form to make new product
app.get('/products/new', (req, res) => {
    res.render('products/new.ejs', { categories })
})
//creating new product through the form--basically to where we are sending the form
app.post('/products', async (req, res) => {
    // const { name, price, category } = req.body;
    // `{name:${name},price:${price},category:${category}}`
    const newProduct = new Product(req.body);
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)
})
//getting our edit form for a particular product!
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', { product, categories })
})
//updating -- basically this is where you end up when you click submit on the edit page!
app.put('/products/:id', async (req, res, next) => {
    //we need to use methodOverride here! -- so we need to install it: npm i method-override
    //then we add "?_method=PUT" to our action in form in our edit.ejs page!
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        if (!product) {
            throw next(new AppError('Product Not found', 404))
        }
        res.redirect(`/products/${product._id}`)
    }catch(err){
        next(err)
    }
    
})
// deleting a product!
app.delete('/products/:id', async (req, res,next) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
        return next(new AppError('Product Not found', 404))
    }
    res.redirect(`/products`)
})
//showing an individual product
app.get('/products/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await Product.findById(`${id}`);
        if(!product){
            throw new AppError('Product Not Found',404)
        }
        res.render('products/show.ejs', { product, id })
    } catch (err) {
        next(err)
    }
})
function handleValidationError(err){
    console.dir(err)
    return new AppError(`Validation Failed...${err.message}`,400 )
}
app.use((err, req, res, next) => {
    console.log(err.name)
    if(err.name === 'ValidationError') {
        err = handleValidationError(err)
    }
    next(err)
})
app.use((err,req,res,next)=>{
    const {status = 500, message = 'Something went wrong'} = err;
    res.status(status).send(message)
})

app.listen(3000, () => {
    console.log('Server Listening on Port 3000!')
})

