const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
    tweet: String,
    likes: Number,
    dislikes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet;