const express = require('express')
const app = express()
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10)
    let oddOrEven = ''
    if (num % 2 == 0) {
        oddOrEven = 'even'
    } else {
        oddOrEven = 'odd'
    }
    res.render('random.ejs', { num, oddOrEven })
})

//     <%  sthjpt %> lets us add some javascript to ejs without the output being rendered
//check random.ejs for more conditional changes

app.listen(5000, () => {
    console.log('Server listening on port 5000')
})
