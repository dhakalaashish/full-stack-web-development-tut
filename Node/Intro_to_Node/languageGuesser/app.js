//requiring express
const express = require('express');
const app = express();
const franc = require('franc')
const langs = require('langs')



app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send('Hello WOrld')
})

app.post('/language', (req, res) => {
    const { language } = req.body;
    const languageShortcut = franc(`${language}`);
    if (languageShortcut === 'und') {
        return res.send('Sorry, your language is not registered in our registery!')
    }
    const languageName = langs.where('3', languageShortcut);
    console.log(languageName.name)
    res.send(`This is the language that you typed on: ${languageName.name}`)
    console.log(franc('Alle menslike wesens word vry'))
})

app.listen(5000, () => {
    console.log('Server is listening at port 5000')
})

