const mongoose = require('mongoose');

main().then(console.log('Connection Open')).catch(err => console.log(err));
//You might think that we should put all of our code inside .then(), as it is to be run after connecting to mongo!
//Mongoose has sth called operation buffering which means it lets you start using your models immediately, without
//waiting for mongoose to establish  a connection to MongoDB

async function main() {
    await mongoose.connect('mongodb://localhost:27017/shopApp');
}
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        //we can define a lot of other things here as a schema, and if we don't use any object then the value will be
        //set to type!
        required: true,
        maxlength: 20
        //we can also set more specifications/schemas just for String, for example -- lowercase:boolean -- this says
        //whether to always call .toLowerCase() on the value!
    },
    price: {
        type: Number,
        //this is not requiring that we pass it a number, but that we pass it something that can turn into a number!
        required: true,
        min: [0, 'Price must be positive ya stupid!']
        //what this does is sets the minimum as 0, and then also sets the error message as the second argument!
    },
    onSale: {
        type: Boolean,
        default: false
        //this means we are defaulting this value to false, unless it is given a true value! so we don't need to 
        //add this to the new ModelName({and define it here})
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
        //enum which is a String Validator -- it allows us to provide an array of potential string values, and 
        //validator makes sure that the value is one of the ones in the array!
    }
})
// these above validations will not obey when we use findOneAndUpdate!, if we want that, we need to do add 
// "runValidators: true" in the options place!

const Product = mongoose.model('Product', productSchema)

const bike = new Product({ name: 'Bike Helmet', price: 5.99, color: 'red', categories: ['cycling', 'safety'] })
// the color:'red' will not be recognized, as the schema did not have anything regarding color!
const bike = new Product({ name: 'Tire Pump', price: 19.50, categories: ['cycling'] })
bike.save()
    .then(data => {
        console.log('It worked', data)
    })
    .catch(err => {
        console.log("On No", err)
    })

Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: -10.99 }, { new: true, runValidators: true })
    .then(data => {
        console.log('It worked', data)
    })
    .catch(err => {
        console.log("On No", err)
    })

const bike = new Product({ name: 'Cycling Jersey', price: 29.99, categories: ['cycling'], size: 'S' })

