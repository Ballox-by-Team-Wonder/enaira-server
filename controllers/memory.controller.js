const Memory = require('../models/memory.model')

async function saveMemory(req, res) {
    const { place, description } = req.body
    const { file } = req
    
    try {
        let result = await Memory.create({ place, description, imageUrl: file.filename, user: req.userID })
        result = await result.populate("user")
        res.status(201).json(result)

    } catch (err) {
        console.log(err)
    }

}

async function getMemories(req, res) {
    try {
        const result = await Memory.find({}).populate("user")
        res.status(200).json(result)

    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    saveMemory,
    getMemories
}