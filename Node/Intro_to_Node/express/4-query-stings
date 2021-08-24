const express = require('express')
const app = express()


app.get('/search', (req, res) => {
    const { animal, color } = req.query
    if (!animal || !color) {
        return res.send('Nothing Found type animal name and color name again!')
    }
    res.send(`Hi! ${color} ${animal}`)
})


app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})