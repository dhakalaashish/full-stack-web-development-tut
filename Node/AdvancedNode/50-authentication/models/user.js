const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: ['true', 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
})

userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username })
    //this here refers to an instance of the User model!
    const isValid = await bcrypt.compare(password, foundUser.password)
    return isValid ? foundUser : false
}

userSchema.pre('save', async function (next) {
    //if a user has more than username and password, we might need to save other things, which means each time we save
    //this pre save function will run! this creates a problem that we will keep on rehashing the password each time we save!
    //so we do:
    if (!this.isModified('password')) return next()
    //so if the same user already has a password as has not modified it, then do other things, call save!
    // but if he has modified his previous password then, call do below:
    this.password = await bcrypt.hash(this.password, 12)
    //here this is whatever we are saving, since we are saving a user, the this here refers to the user being saved!
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
