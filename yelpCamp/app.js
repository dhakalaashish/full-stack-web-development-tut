const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override')
const campgroundsRoute = require('./routes/campgrounds')
const reviewsRoute = require('./routes/reviews')
const session = require('express-session')
const flash = require('connect-flash')

main().then(data => console.log('Database connected!')).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+ 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
    },
}))
app.use(flash())

app.use((req,res,next)=>{
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

app.use('/campgrounds', campgroundsRoute)
app.use('/campgrounds/:campId/reviews', reviewsRoute)

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error.ejs', { err, statusCode })
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})