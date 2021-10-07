const express = require('express')
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync')
const Campground = require('../models/campground.js')
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware')


router.get('/', wrapAsync(async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index.ejs', { campgrounds })
}))
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new.ejs')
})
router.post('/', isLoggedIn, validateCampground, wrapAsync(async (req, res, next) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Campground Data',400)
    const campground = new Campground(req.body.campground)
    campground.author = req.user._id
    await campground.save()
    req.flash('success', 'Successfully made a new campground')
    res.redirect(`/campgrounds/${campground._id}`)
}))
router.get('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id).populate({ path: 'reviews', populate: { path: 'author' } }).populate('author');
    console.log(campground)
    if (!campground) {
        req.flash('error', 'Campground cannot be found!')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show.ejs', { campground })
}))
router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if (!campground) {
        req.flash('error', 'Campground cannot be found!')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit.ejs', { campground })
}))

router.put('/:id', isLoggedIn, isAuthor, validateCampground, wrapAsync(async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success', 'Successfully updated Campground')
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:id', isLoggedIn, isAuthor, wrapAsync(async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted a Campground!')
    res.redirect('/campgrounds')
}))

module.exports = router;