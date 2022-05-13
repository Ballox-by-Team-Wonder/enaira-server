const Comment = require('../models/comment.model')

async function createComment(req, res) {
    const { 
        userID, 
        params: { memoryID }, 
        body: { body } 
    } = req

    try {
        const result = await Comment.create({ body, memory: memoryID.toString(), user: userID.toString() })
        res.status(201).json(result)

    } catch (err) {
        res.status(500).json({ message: 'something went wrong' })
    }
}


async function getCommentsForMemory(req, res) {
    const { 
        params: { memoryID } 
    } = req

    try {
        const result = await Comment.find({ memory: memoryID }).populate("user")
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ message: 'something went wrong' })
    }
}

module.exports = {
    createComment,
    getCommentsForMemory
}