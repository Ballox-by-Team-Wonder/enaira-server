const Memory = require('../models/memory.model')

async function saveMemory(req, res) {
    const { place, description } = req.body
    const { file } = req
    
    try {
        const result = await Memory.create({ place, description, imageUrl: file.filename, user: req.userID })
        res.status(201).json(result)

    } catch (err) {
        console.log(err)
    }

}

module.exports = {
    saveMemory
}