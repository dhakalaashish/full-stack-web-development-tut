const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Tweet = require('../models/tweet')

const mongoose = require('mongoose')
const ejs = require('ejs')
const path = require('path')
const methodOverride = require('method-override')



//USER ROUTES--------------------
//User index
router.get('/', async (req, res) => {
    const users = await User.find({}).populate('tweets')
    res.render('users/index.ejs', { users })
})
//New User Form
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})
//Post for new user
router.post('/', async (req, res) => {
    const user = await new User(req.body)
    await user.save()
    res.redirect('/users')
})
//show each user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params
    const user = await User.findById(userId).populate('tweets')
    res.render('users/show.ejs', { user })
})
//edit form
router.get('/:userId/edit', async (req, res) => {
    const { userId } = req.params
    const user = await User.findById(userId)
    res.render('users/edit.ejs', { user })
})
//edit user route
router.put('/:userId', async (req, res) => {
    const { userId } = req.params
    const update = req.body
    const user = await User.findByIdAndUpdate(userId, update)
    res.redirect(`/users/${userId}`)
})
//delete user route
router.delete('/:userId', async (req, res) => {
    const { userId } = req.params
    const user = await User.findByIdAndDelete(userId)
    res.redirect('/users')
})


module.exports = router