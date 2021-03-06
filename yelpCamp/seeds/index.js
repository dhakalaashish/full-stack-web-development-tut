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


// descriptors[Math.floor(Math.random() * descriptors.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = await Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = await new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city},${cities[random1000].state}`,
            images: [
                {
                    url:'https://res.cloudinary.com/aashishdhakal/image/upload/v1633658606/YelpCamp/jlxkqto4rnum6ar3alz5.jpg',
                    filename:'YelpCamp/jlxkqto4rnum6ar3alz5'
                },
            ],
            description: 'The definition of a description is a statement that gives details about someone or something.An example of description is a story about the places visited on a family tria description of the journey; gave a vivid description of the game.',
            price: price,
            geometry:{
                type:'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            author: '615ff3f5b5af76051173315c'
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})