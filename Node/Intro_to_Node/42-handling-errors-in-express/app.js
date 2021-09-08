// For errors returned from asynchronous functions invoked by route handlers and middlware, you must pass them to the next()
//function, where Express will catch and process them!
// app.get('/',async function(req,res,next){
//     fs.readfile('/file-does-not-exist',function(err,data){
//         if(err){
//             next(err) //Pass errors to Express
//         }else{
//             res.send(data)
//         }
//     })
// })

const AppError = require("../37-express-with-mongoose/AppError");

// we can also use try catch!, like this!
// app.put('/products/:id', async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
//         if (!product) {
//             throw next(new AppError('Product Not found', 404))
//         }
//         res.redirect(`/products/${product._id}`)
//     } catch (err) {
//         next(err)
//     }
// })

// or just this:
// app.delete('/products/:id', async (req, res, next) => {
//     const { id } = req.params;
//     const deletedProduct = await Product.findByIdAndDelete(id);
//     if (!deletedProduct) {
//         return next(new AppError('Product Not found', 404))
//     }
//     res.redirect(`/products`)
// })

// we can define a function that we can pass the entire callback to!

function wrapAsync(fn){
    return function(req,res,next){
        fn(req,res,next).catch(err => next(err))
    }
}
//so basically wrapAsync takes a function passed in it, and executes that function but also adds a catch(err) on it and catches
//any error if it occurs!
app.get('/products/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await Product.findById(`${id}`);
        if (!product) {
            throw new AppError('Product Not Found', 404)
        }
        res.render('products/show.ejs', { product, id })
    } catch (err) {
        next(err)
    }
})
// this above route handler can be written as:
app.get('/products/:id', wrapAsync(async (req, res, next) => {
        const { id } = req.params
        const product = await Product.findById(`${id}`);
        if (!product) {
            throw new AppError('Product Not Found', 404)
        }
        res.render('products/show.ejs', { product, id })
}))

//there are distinct categories of errors for mongoose!, mongoose error has a name, or errors name is just "err"
//mongoose error name example -- "ValidationError", and we can use this to say, if this error is the name of the 
//error then call this function, that we have already defined!!

function handleValidationError(err){
    console.dir(err)
    return new AppError(`Validation Failed ... ${err.message}`,400)
}

app.use((err,req,res,next)=>{
    console.log(err.name)
    if(err.name === 'ValidationError'){
        err = handleValidationErr(err)
    }
    next(err)
})
//these will run one after another!
app.use((err,req,res,next)=>{
    const {status = 500, message = 'Something went wrong'} = err;
    res.status(status).send(message)
})

