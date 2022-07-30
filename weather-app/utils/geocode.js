const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW9zdHl4cyIsImEiOiJja3R5cGttMDkxZ3F2Mm5wOGd0bzNlczk4In0.Rn6i-TVOcw-AIcqatUQVqw&limit=1'

    h
    request({url: url, json: true}, (error, {body}) => {
        if(error) {
            return callback('Unable to connect to location services!', undefined)
        } else if (body.features?.length === 0) {
            return callback('Unable to find location. Try another search.', undefined)
        } 

        return callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })

        

        
    })
}




module.exports = geocode