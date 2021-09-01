//--------------------adding custom methods to Schema ---- Model Instance Method----------------
//syntax --> schemaName.methods.methodName = function(parameter){method that we wills setup}

const mongoose = require('mongoose');

main().then(console.log('Connection Open')).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/shopApp');
}
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive ya stupid!']
    },
    onSale: {
        type: Boolean,
        default: false
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
    }
})
// --------------------static models---------------------//
//Static Models are models that live on the Model itself! Here, unlike with instance model, we don't have access to
//the keyword this, as this here refers to the model class itsef!
//syntax --> schemaName.statics.nameOfTheMethod = function(parameter){write your function here}

productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 2 })
}
const Product = mongoose.model('Product', productSchema)

Product.fireSale().then(res => console.log(res))
