const mongoose = require('mongoose')
main().then(data => console.log('Database Connected!!')).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/relationshipDemo');
}

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
})
const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
})
const Product = mongoose.model('Product', productSchema)
const Farm = mongoose.model('Farm', farmSchema)

// Product.insertMany([
//     { name: 'Goddess Melon', price: 4.99, season: 'Summer' },
//     { name: 'Sugar Baby Watermelon', price: 4.99, season: 'Summer' },
//     { name: 'Asparagus', price: 3.99, season: 'Spring' },
// ])

// const makeFarm = async () => {
//     const farm = await new Farm({
//         name: 'Hamro Jagga',
//         city: 'Lalitpur'
//     })
//     const melon = await Product.findOne({ name: 'Goddess Melon' })
//     farm.products.push(melon)
//     await farm.save()
//     console.log(farm)
// }
// makeFarm()

// const addProduct = async () => {
//     const farm = await Farm.findOne({ name: 'Hamro Jagga' })
//     const watermelon = await Product.findOne({ name: 'Sugar Baby Watermelon' })
//     farm.products.push(watermelon)
//     await farm.save()
//     console.log(farm)
// }
// addProduct()

Farm.findOne({ name: 'Hamro Jagga' }).populate('products').then(farm => console.log(farm))
//we are populating the products field in farmSchema!