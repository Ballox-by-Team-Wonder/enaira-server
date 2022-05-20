const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const memorySchema = new Schema({
    title: { type: String },
    place: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    public: { type: Boolean, required: true },
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