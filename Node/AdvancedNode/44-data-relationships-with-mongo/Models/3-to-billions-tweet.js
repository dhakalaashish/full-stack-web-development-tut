const mongoose = require('mongoose')
main().then(data => console.log('Database Connected!!')).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/relationshipDemo');
}

const userSchema = new mongoose.Schema({
    username: String,
    age: Number,
})

const tweetSchema = new mongoose.Schema({
    text: String,
    likes: Number,
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const User = mongoose.model('User', userSchema)
const Tweet = mongoose.model('Tweet', tweetSchema)

// const makeTweets = async () => {
//     const user = await new User({ username: 'ashish.dhakal07', age: 23 })
//     const tweet1 = await new Tweet({ text: 'I just came back from Ghandruk with 15 hours of travels', likes: 135 })
//     const tweet2 = await new Tweet({ text: 'Why am I such a bitch! Gotta change', likes: 9955 })
//     tweet1.user = user;
//     tweet2.user = user;
//     await user.save()
//     await tweet1.save()
//     await tweet2.save()
// }
// makeTweets()


Tweet.findById('6149d000ce1b1f69e4d3b488').populate('user', 'username').then(tweet => console.log(tweet))
//populate the user but only show me the username!! thats what the second parameter in populate does
