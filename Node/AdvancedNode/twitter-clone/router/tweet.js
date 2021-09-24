const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Tweet = require('../models/tweet')

const mongoose = require('mongoose')
const ejs = require('ejs')
const path = require('path')
const methodOverride = require('method-override')



//TWEET ROUTES------------------------
//index for all tweets
router.get('/tweets', async (req, res) => {
    const tweets = await Tweet.find({}).populate('user', 'name')
    res.render('tweets/index', { tweets })
})
//make a new tweet for a particular user form
router.get('/users/:userId/tweets/new', async (req, res) => {
    const { userId } = req.params
    const user = await User.findById(userId)
    res.render('tweets/new.ejs', { user })
})
//posting a new tweet for that user
router.post('/users/:userId/tweets', async (req, res) => {
    const { userId } = req.params
    const user = await User.findById(userId)
    const tweet = await new Tweet(req.body)
    tweet.user = user;
    user.tweets.push(tweet);
    await user.save()
    await tweet.save();
    res.redirect(`/users/${userId}`)
})
//show tweet
router.get('/users/:userId/tweets/:tweetId', async (req, res) => {
    const { userId, tweetId } = req.params
    const user = await User.findById(userId)
    const tweet = await Tweet.findById(tweetId)
    res.render('tweets/show.ejs', { user, tweet })
})
//deleting tweet
router.delete('/users/:userId/tweets/:tweetId', async (req, res) => {
    const { userId, tweetId } = req.params
    const tweet = await Tweet.findByIdAndDelete(tweetId)
    res.redirect(`/users/${userId}`)
})
//edit form for tweet
router.get('/users/:userId/tweets/:tweetId/edit', async (req, res) => {
    const { userId, tweetId } = req.params
    const user = await User.findById(userId)
    const tweet = await Tweet.findById(tweetId)
    res.render('tweets/edit.ejs', { user, tweet })
})
router.put('/users/:userId/tweets/:tweetId', async (req, res) => {
    const { userId, tweetId } = req.params
    const update = req.body
    await Tweet.findByIdAndUpdate(tweetId, update)
    res.redirect(`/users/${userId}/tweets/${tweetId}`)
})


module.exports = router
