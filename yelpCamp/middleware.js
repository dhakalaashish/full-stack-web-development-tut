module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //store the url they were in!
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in!')
        return res.redirect('/login')
    }
    next()
}