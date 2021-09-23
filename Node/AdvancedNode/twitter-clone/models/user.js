const mongoose = require('mongoose')
const Tweet = require('./tweet')

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    // email: [String, 'email is required'],
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ]
})

userSchema.post('findOneAndDelete', async function (user) {
    if (user.tweets.length) {
        const result = await Tweet.deleteMany({ _id: { $in: user.tweets } })
        console.log(result)
    }
})


const User = mongoose.model('User', userSchema)

module.exports = User;