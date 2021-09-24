// const express = require('express')
// const app = express()
// const mongoose = require('mongoose')
// const ejs = require('ejs')
// const path = require('path')
// const methodOverride = require('method-override')

// const User = require('./models/user')
// const Tweet = require('./models/tweet')
// const { userInfo } = require('os')

// main().then(data => console.log('Database Connected!')).catch(err => console.log(err));

// async function main() {
//     await mongoose.connect('mongodb://localhost:27017/twitterClone');
// }

// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'))

// app.use(methodOverride('_method'))
// app.use(express.urlencoded({ extended: true }))

// //USER ROUTES--------------------
// //User index
// app.get('/users', async (req, res) => {
//     const users = await User.find({}).populate('tweets')
//     res.render('users/index.ejs', { users })
// })
// //New User Form
// app.get('/users/new', (req, res) => {
//     res.render('users/new.ejs')
// })
// //Post for new user
// app.post('/users', async (req, res) => {
//     const user = await new User(req.body)
//     await user.save()
//     res.redirect('/users')
// })
// //show each user
// app.get('/users/:userId', async (req, res) => {
//     const { userId } = req.params
//     const user = await User.findById(userId).populate('tweets')
//     res.render('users/show.ejs', { user })
// })
// //edit form
// app.get('/users/:userId/edit', async (req, res) => {
//     const { userId } = req.params
//     const user = await User.findById(userId)
//     res.render('users/edit.ejs', { user })
// })
// //edit user route
// app.put('/users/:userId', async (req, res) => {
//     const { userId } = req.params
//     const update = req.body
//     const user = await User.findByIdAndUpdate(userId, update)
//     res.redirect(`/users/${userId}`)
// })
// //delete user route
// app.delete('/users/:userId', async (req, res) => {
//     const { userId } = req.params
//     const user = await User.findByIdAndDelete(userId)
//     res.redirect('/users')
// })

// //TWEET ROUTES------------------------
// //index for all tweets
// app.get('/tweets', async (req, res) => {
//     const tweets = await Tweet.find({}).populate('user', 'name')
//     res.render('tweets/index', { tweets })
// })
// //make a new tweet for a particular user form
// app.get('/users/:userId/tweets/new', async (req, res) => {
//     const { userId } = req.params
//     const user = await User.findById(userId)
//     res.render('tweets/new.ejs', { user })
// })
// //posting a new tweet for that user
// app.post('/users/:userId/tweets', async (req, res) => {
//     const { userId } = req.params
//     const user = await User.findById(userId)
//     const tweet = await new Tweet(req.body)
//     tweet.user = user;
//     user.tweets.push(tweet);
//     await user.save()
//     await tweet.save();
//     res.redirect(`/users/${userId}`)
// })
// //show tweet
// app.get('/users/:userId/tweets/:tweetId', async (req, res) => {
//     const { userId, tweetId } = req.params
//     const user = await User.findById(userId)
//     const tweet = await Tweet.findById(tweetId)
//     res.render('tweets/show.ejs', { user, tweet })
// })
// //deleting tweet
// app.delete('/users/:userId/tweets/:tweetId', async (req, res) => {
//     const { userId, tweetId } = req.params
//     const tweet = await Tweet.findByIdAndDelete(tweetId)
//     res.redirect(`/users/${userId}`)
// })
// //edit form for tweet
// app.get('/users/:userId/tweets/:tweetId/edit', async (req, res) => {
//     const { userId, tweetId } = req.params
//     const user = await User.findById(userId)
//     const tweet = await Tweet.findById(tweetId)
//     res.render('tweets/edit.ejs', { user, tweet })
// })
// app.put('/users/:userId/tweets/:tweetId', async (req, res) => {
//     const { userId, tweetId } = req.params
//     const update = req.body
//     await Tweet.findByIdAndUpdate(tweetId, update)
//     res.redirect(`/users/${userId}/tweets/${tweetId}`)
// })



// app.listen(3000, () => {
//     console.log('Server listening on port 3000!')
// })


const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const userRouter = require('./router/user')
const tweetRouter = require('./router/tweet')

const session = require('express-session')
const flash = require('connect-flash')

const mongoose = require('mongoose')
main().then(data => console.log('Database Connected!')).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/twitterClone');
}

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(session({
    secret: 'jptsecret',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

//using user router
app.use('/users', userRouter)
//using tweet router
app.use('/', tweetRouter)


app.listen(3000, () => {
    console.log('Server Listening on port 3000')
})
