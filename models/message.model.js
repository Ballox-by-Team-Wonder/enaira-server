const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const messageSchema = new Schema({
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

const Message = mongoose.model('Message', messageSchema)

module.exports = Message;