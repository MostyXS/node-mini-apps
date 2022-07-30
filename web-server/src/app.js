const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Yury Mostseev'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Yury Mostseev'
    })
})
app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help Page',
        helpText: 'This is some helpful text',
        name: 'Yury Mostseev'
    })
})

app.get('/products', (req, res) => {
    if(!res.query.search) {
        return res.send({
            "error": "You must provide a search term"
        })
    }
    
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    res.send({
        location: 'Philadelphia'
    })
})

app.get('*', (req, res) => {
    res.send('My 404 page')
})

app.listen(3000, () => {console.log('Listening on port 3000')})