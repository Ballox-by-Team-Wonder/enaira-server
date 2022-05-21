const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const memorySchema = new Schema({
    title: { type: String },
    experience: { type: String },
    imageUrl: { type: String },
    public: { type: Boolean, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    authorized: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
}, {
    timestamps: true,
})

const Memory = mongoose.model('Memory', memorySchema)

module.exports = Memory;