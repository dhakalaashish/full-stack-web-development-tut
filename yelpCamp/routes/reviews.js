const express = require('express')
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground.js')
const Review = require('../models/review')
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware')



router.post('/', isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.campId)
    const review = new Review(req.body.review)
    review.author = req.user._id
    campground.reviews.push(review)
    console.log(review)
    await review.save()
    await campground.save()
    req.flash('success', 'Created new review')
    res.redirect(`/campgrounds/${campground._id}`)
}))
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
    const { campId, reviewId } = req.params
    await Campground.findByIdAndUpdate(campId, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/campgrounds/${campId}`)
}))

module.exports = router