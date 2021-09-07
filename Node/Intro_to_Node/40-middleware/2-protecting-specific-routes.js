const express = require('express')
const app = express()
const morgan = require('morgan')

// app.use((req, res, next) => {
//     const { password } = req.query
//     if (password === 'chickennugget') {
//         return next()
//     }
//     res.send('Sorry you need a password!')
// })
// the code above will fake authenticate each route, let's try to only authenticate the path "/secret"
//we can give a function name to the above app.use
const verifyPassword = (req, res, next) => {
    const { password } = req.query
    if (password === 'chickennugget') {
        return next()
    }
    res.send('Sorry you need a password!')
}

app.get('/dogs', (req, res) => {
    res.send('WOOF WOOF')
})

app.get('/secret', verifyPassword, (req, res) => {
    //so we will only get to res.send if we can verify the password
    res.send('I am not as kind as I seem??? Not sure, but I am sometimes heartless, maybe mostof the times')
})



app.listen(3000, () => {
    console.log('Server listening on port 3000')
})