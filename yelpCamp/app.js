if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override')
const campgroundsRoute = require('./routes/campgrounds')
const reviewsRoute = require('./routes/reviews')
const usersRoute = require('./routes/users')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const { contentSecurityPolicy } = require('helmet')
const MongoDBStore = require('connect-mongo')
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp'
main().then(data => console.log('Database connected!')).catch(err => console.log(err));
async function main() {
    await mongoose.connect(dbUrl, {
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
app.use(mongoSanitize({
    replaceWith: '_'
}))

const secret = process.env.SECRET || 'secret'

const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 3600 //time is in seconds
})

store.on('error', function (e) {
    console.log('Session Store Error', e)
})

const sessionConfig = {
    store,
    name: 'sessionName',//basically change this to any name other than the default!
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000, //these are in milliseconds!
    },
}

app.use(session(sessionConfig))
app.use(flash())
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
// const scriptSrcUrls = [
//     "https://stackpath.bootstrapcdn.com/",
//     "https://api.tiles.mapbox.com/",
//     "https://api.mapbox.com/",
//     "https://kit.fontawesome.com/",
//     "https://cdnjs.cloudfare.com/",
//     "https://cdn.jsdelivr.net",
// ];

// const styleSrcUrls = [
//     "https://kit-free.fontawesome.com/",
//     "https://stackpath.bootstrapcdn.com/",
//     "https://api.mapbox.com/",
//     "https://api.tiles.mapbox.com/",
//     "https://fonts.googleapis.com/",
//     "https://use.fontawesome.com/"
// ];

// const connectSrcUrls = [
//     "https://api.mapbox.com/",
//     "https://a.tiles.mapbox.com/",
//     "https://b.tiles.mapbox.com",
//     "https://events.mapbox.com/"
// ];

// const fontSrcUrls = [];

// app.use(
//     helmet.contentSecurityPolicy({
//         directives:{
//             defaultSrc: [],
//             connectSrc: ["'self'", ...connectSrcUrls],
//             scriptSrc: ["'unsafe-inline'","'self'",...scriptSrcUrls],
//             styleSrc: ["'self'","'unsafe-inline'",...styleSrcUrls],
//             workerSrc: ["'self'","blob:"],
//             objectSrc:[],
//             imgSrc:[
//                 "'self'",
//                 "blob:",
//                 "data:",
//                 "https://res.cloudinary.com/aashishdhakal/",
//                 "https://images.unsplash.com/"
//             ],
//             fontSrc: ["'self'", ...fontSrcUrls]
//         }
//     })
// )

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    console.log(req.query)
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

app.use('/', usersRoute)
app.use('/campgrounds', campgroundsRoute)
app.use('/campgrounds/:campId/reviews', reviewsRoute)

app.get('/fakeUSer', async (req, res) => {
    const user = new User({ email: 'ak@gmail.com', username: 'aashish4' })
    const newUser = await User.register(user, 'monkey')
    res.send(newUser)
})

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