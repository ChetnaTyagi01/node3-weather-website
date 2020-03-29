//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8cddef314a96531163a79247a6d332af/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    //request({url: url, json: true}, (error, response) => {
        // using shorthand syntax and object destructuring
        request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        // } else if(response.body.error){
        // object destructuring
        } else if(body.error){
            callback('Unable to find location!', undefined)
        }
        else{
            callback(undefined, 
                body.daily.data[0].summary +
                ' It is currently ' + body.currently.temperature + ' degrees out. '+
                'There is '+ body.currently.precipProbability + '% chance of rain.'
            )
        }

    })
}

// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error: '+error)
//     console.log('Data', data)
// })

module.exports = forecast