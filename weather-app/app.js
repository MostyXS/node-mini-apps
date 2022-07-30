const geocode = require('./utils/geocode')


geocode('Boston', (error, data) => {
    console.log(error)
    console.log(data)
})