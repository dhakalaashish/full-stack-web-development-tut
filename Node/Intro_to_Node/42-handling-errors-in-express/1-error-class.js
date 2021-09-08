//express comes with a built-in error handler that takes care of any errors that might be encountered in the app. This default
//error-handling middlware function is added at the end of the middleware function stack.
//when an error is written as an argument in the app.get, we will have res.statusCode, res.statusMessage and err.headers
//we can also do throw new Eroor('Password Required')

//Writing error handlers
//Define error handling middleware functions in the same way as other middleware functions, except error-handling
//functions have four arguments instead of three: (err,req,res,next)
//IMP: we need to define error-handling middleware last, after other app.use() and routes calls

const express = require('express')
const app = express()

// then we require our file here! with the class AppError
const AppError = require('./AppError')

const verifyPassword = (req, res, next) => {
    const { password } = req.query
    if (password === 'chickennugget') {
        return next()
    }
    // res.send('Sorry you need a password!')
    // res.status(401) --- we dont need this because we used AppError instead of just throwing new error, not we will
    //make a class of AppError, which will extend the Error class!
    throw new AppError('Password Required', 401)
}

app.get('/dogs', (req, res) => {
    res.send('WOOF WOOF')
})
app.get('/error', (req, res) => {
    chicken.fly()
    throw new AppError('Password Required', 401)
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('I am not as kind as I seem??? Not sure, but I am sometimes heartless, maybe mostof the times')
})

// app.use((err,req,res,next)=>{
//     console.log('***********************************')
//     console.log('*****************error*************')
//     console.log(err)
//     next(err);
//     //if you pass anything to the next() function (except the string "route"), Express regards the current request as
//     //being an error and will skip any remaining non-error handling routing and middleware functions.
// })

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message)
})

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})