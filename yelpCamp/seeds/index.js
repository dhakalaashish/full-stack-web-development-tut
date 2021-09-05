const mongoose = require('mongoose')
const cities = require('./cities.js')
const { descriptors, places } = require('./seedHelpers')

const Campground = require('../models/campground.js')

main().then(data => console.log('Database connected!')).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
const sample = (array) => array[Math.floor(Math.random() * array.length)]


descriptors[Math.floor(Math.random() * descriptors.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = await Math.floor(Math.random() * 1000)
        const camp = await new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city},${cities[random1000].state}`
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})