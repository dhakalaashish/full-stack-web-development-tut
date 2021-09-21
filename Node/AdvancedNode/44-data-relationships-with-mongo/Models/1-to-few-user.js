const mongoose = require('mongoose')
main().then(data => console.log('Database Connected!!')).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/relationshipDemo');
}

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            street: String,
            city: String,
            state: String,
            country: String,
        }
    ]
})

const User = mongoose.model('User', userSchema)

const makeUser = async () => {
    const u = await new User({
        first: 'Aashish',
        last: 'Dhakal',
    })
    u.addresses.push({
        street: '25 Francis Street',
        city: 'Annapolis',
        state: 'MD',
        country: 'USA'
    })
    const res = await u.save()
    console.log(res)
}

const addAddress = async (id) => {
    const user = await User.findById(id)
    user.addresses.push({
        street: '28 Market Space',
        city: 'Annapolis',
        state: 'MD',
        country: 'USA'
    })
    user.addresses.push({
        street: '3033 E Thunderbird rd',
        city: 'Phoenix',
        state: 'AZ',
        country: 'USA'
    })
    const res = await user.save()
    console.log(res)
}

makeUser();
addAddress('613c0a6bc8fe07ebf416650f'); // this id is for harry potter


