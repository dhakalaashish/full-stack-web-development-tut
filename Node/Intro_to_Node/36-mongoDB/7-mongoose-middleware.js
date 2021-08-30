
const mongoose = require('mongoose');

main().then(console.log('Connection Open')).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/shopApp');
}
const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

//this is for the get!
personSchema.virtual('fullName')
    .get(function () {
        return this.name.first + ' ' + this.name.last;
    })
    //this will behave like an actual property!
    .set(function (v) {
        this.name.first = v.substr(0, v.indexOf(' '));
        this.name.last = v.substr(v.indexOf(' ') + 1);
    });

// ------------- mongoose middle ware ---------------
// Middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous
//functions. Middleware is specified on the schema level and is useful for writing plugins.

//Pre 
//Pre middleware functions are executed one after another, when each middleware calls next()

//Post 
//Post middleware are executed after the hooked method and all of its pre middleware have been completed.

personSchema.pre('save', function () {
    this.first = 'YO'
    this.last = 'Mama'
    console.log("About to save!!")
})
personSchema.post('save', function () {
    console.log("Just saved!!!!!!!!!")
})

const Person = mongoose.model('Person', personSchema)





