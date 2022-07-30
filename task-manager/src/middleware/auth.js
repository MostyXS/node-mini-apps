const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        const decoded = jwt.verify(token, 'thisismynewcourse')
        //If any token is found - then it is valid, iteration is automated
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})

        if (!user) {
            throw new Error()
        }
        //To store a user for a future interaction with it
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({error: 'Please authenticate'})
    }
}

module.exports = auth