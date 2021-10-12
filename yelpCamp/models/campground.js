const mongoose = require('mongoose');
const { campgroundSchema } = require('../schemas');
const Review = require('./review');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

ImageSchema.virtual('smallerThumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_150')
})




const options = {
    toJSON:{
        virtuals: true
    }
}

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, options)

CampgroundSchema.virtual('properties.popUpMarkup').get(function(){
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong><br>
            <p>${this.description.substring(0,20)}...</p>`
})

CampgroundSchema.post('findOneAndDelete', async function (document) {
    if (document) {
        await Review.deleteMany({
            _id: {
                $in: document.reviews
            }
        })
    }
})

const Campground = mongoose.model('Campground', CampgroundSchema)

module.exports = Campground;