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
productSchema.methods.greet = function () {
    //use a function exclamation not an arrow function
    console.log('Hello!! HI!! AAshish here!')
    console.log(`-from ${this.name}`)
}
productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}
productSchema.methods.addCategory = function (added) {
    this.categories.push(added);
    return this.save()
}
const Product = mongoose.model('Product', productSchema)

const findProduct = async function () {
    const foundProduct = await Product.findOne({ name: 'Bike Helmet' })
    console.log(foundProduct)
    await foundProduct.toggleOnSave();
    console.log(foundProduct)
    await foundProduct.addCategory('Outdoors')
    console.log(foundProduct)
}
findProduct()