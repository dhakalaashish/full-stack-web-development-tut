const express = require('express')
const app = express()
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/dogs', (req, res) => {
    const dogs = ['Arcadia', 'Mukki', 'Toffey', 'Coco'];
    res.render('dogs', { dogs })
})
//look at dogs.ejs in views directory to see how we did it!

app.listen(5000, () => {
    console.log('Server listening on port 5000')
})
