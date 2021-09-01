
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

const Person = mongoose.model('Person', personSchema)



