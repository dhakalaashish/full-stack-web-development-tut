//requiring mongoose
const { Decimal128 } = require('bson');
const mongoose = require('mongoose');
main().then(data => console.log('Mongo Connection Successful!')).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/gro');
}
//defining new Schema!
const grocerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity:{
        type:Number,
        default:1,
        max:10,
    },
    category: {
        type: [String],
        required: false,
        enum: ['breakfast', 'lunch', 'dinner', 'dessert'],
    },
    forWhom: {
        type: String,
        enum: ['Darcy', 'Aashish', 'Both'],
    }
})
//compiling our schema into a model!
const Grocery = mongoose.model('Grocery', grocerySchema)

module.exports = Grocery;