const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    body: { type: String },
    memory: {
        type: Schema.Types.ObjectId,
        ref: "Memory"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true,
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;