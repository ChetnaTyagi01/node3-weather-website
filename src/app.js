const express = require('express')//express library exposes a single function
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//heroku setup
const port = process.env.PORT || 3000

//Routes
//app.com
//app.com/help
//app.com/about

// //setting up routes
// app.get('', (req, res) => {
//     res.send('Hello Express!')
// })

// app.get('/help', (req, res) => {
//     res.send('Help Page!')
// })

// app.get('/about', (req, res) => {
//     res.send('About Us!')
// })

// app.get('/weather', (req, res) => {
//     res.send('Weather Page!')
// })




// //serving html and JSON inside routes
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         // name: 'Chetna',
//         // age: 24
//         name: 'Chetna'
//     },
//     {name: 'Vidhi'}])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page!</h1>')
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'Clear throughout today',
//         location: 'UttarPradesh, India'
//     })
// })




//serving from static html file

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname))
// console.log(path.join(__dirname, '..'))
// console.log(path.join(__dirname, '../public'))

// const publicDirectoryPath = path.join(__dirname, '../public')
// app.use(express.static(publicDirectoryPath))    


// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'Clear throughout today',
//         location: 'UttarPradesh, India'
//     })
// })

// app.listen(3000, () => {
//     console.log('Server is up on port 3000!')
// })

// //handlebars and templating

// //Define paths for express config
// const publicDirectoryPath = path.join(__dirname, '../public')
// const viewsPath = path.join(__dirname, '../templates')
// //console.log(viewsPath)

// // Setup handlebars engine and views location
// app.set('view engine', 'hbs')
// app.set('views', viewsPath)

// //Setup static directory to serve
// app.use(express.static(publicDirectoryPath))    

// app.get('', (req, res) => {
//     res.render('index', {
//         title: 'Weather App',
//         name: 'Chetna Tyagi'
//     })
// })

// app.get('/about', (req, res) => {
//     res.render('about', {
//         title: 'About Me',
//         name: 'Chetna Tyagi'
//     })
// })

// app.get('/help', (req, res) => {
//     res.render('help', {
//         title: 'How can we help you ?',
//         message: 'Please refer to the details below for any issues.'
//     })
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'Clear throughout today',
//         location: 'UttarPradesh, India'
//     })
// })

// app.listen(3000, () => {
//     console.log('Server is up on port 3000!')
// })

//partials and handlebars
//partials - parts of a web page we reuse in multiple pages of a website. Like headers and footers.

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))    

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chetna Tyagi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Chetna Tyagi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'How can we help you?',
        message: 'Please refer to the details below for any issues.',
        name: 'Chetna Tyagi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address term!"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error){
                return res.send({ error })
        }
        
        //input for forecast comes from output of geocode
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }   
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
        
})

//Adding query string
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term!"
        })
    }else {
        res.send({
            products: []
        })
    }
    // console.log(req.query.search)
    // res.send({
    //     products: []
    // })
})

app.get('/help/*', (req, res) => {
    //res.send('Help article not found!')
    res.render('404', {
        title: '404',
        name: 'Chetna Tyagi',
        errorMessage: 'Help article not found!'
        
    })
})

//should come at last
//* - wildcard operator - to search for all matches that has not been searched so far
app.get('*', (req, res) => {
    //res.send('My 404 page!')
    res.render('404', {
        title: '404',
        name: 'Chetna Tyagi',
        errorMessage: 'Page not found!'

    })
})

//for running locally
// app.listen(3000, () => {
//     console.log('Server is up on port 3000!')

//for running on heroku
app.listen(port, () => {
    console.log('Server is up on port' +port+'!')
})
