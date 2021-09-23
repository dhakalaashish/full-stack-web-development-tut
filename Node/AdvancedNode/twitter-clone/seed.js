const mongoose = require('mongoose')
main().then(data => console.log('Database Connected!')).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/twitterClone');
}

const User = require('./models/user')
const Tweet = require('./models/tweet');
const { findById } = require('./models/user');



// const makeUser = async () => {
//     const u = await new User({
//         name: 'Aashish Dhakal',
//         age: 23,
//     })
//     const result = await u.save()
//     console.log(result)
// }
// makeUser()

const makeTweet = async () => {
    const t = await new Tweet({
        tweet: 'Hello! Nice to see you guys. Hello World',
        likes: 5,
        dislikes: 2,
    })
    const user = await User.findById('614b2cf499afef9cbb8456fd')
    t.user = user;
    const result = await t.save()
    console.log(result)
}
makeTweet()