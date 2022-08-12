const User = require('../models/user.model')

async function incrementUserPoints(userID, amount = 1) {
    try {
        await User.findByIdAndUpdate(
            userID, 
            { $inc: { points: amount } }, 
            { new: true }
        )
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    incrementUserPoints
}