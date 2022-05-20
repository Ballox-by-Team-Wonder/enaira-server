const Message = require('../models/message.model')

async function createMessage(req, res) {
    const { 
        userID, 
        params: { memoryID }, 
        body: { body } 
    } = req

    try {
        const result = await Message.create({ body, memory: memoryID.toString(), user: userID.toString() })
        res.status(201).json(result)

    } catch (err) {
        res.status(500).json({ message: 'something went wrong' })
    }
}


async function getMessagesForMemory(req, res) {
    const { 
        params: { memoryID } 
    } = req

    try {
        const result = await Message.find({ memory: memoryID }).populate("user")
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ message: 'something went wrong' })
    }
}

module.exports = {
    createMessage,
    getMessagesForMemory
}