const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const memorySchema = new Schema({
    place: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, {
    timestamps: true,
})

const Memory = mongoose.model('Memory', memorySchema)

module.exports = Memory;