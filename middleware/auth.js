const jwt = require('jsonwebtoken')

async function auth (req, res, next) {
    
    try {
        const token = req.headers.authorization.split(" ")[1]

        const decodedData = jwt.decode(token)
        
        req.userId = decodedData?.sub

        next()

    } catch (error) {
        
        return res.status(401).json({ message: "Unauthorized" })
    }
}

module.exports = {
    auth
};