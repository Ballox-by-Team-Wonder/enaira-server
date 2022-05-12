const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true, trim: true, minlength: 3 },
    email: { type: String, required: true, unique: true},
    imageUrl: { type: String },
    password: { type: String, required: true },
    memories: [{
        type: Schema.Types.ObjectId,
        ref: "Memory"
    }],
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema)

module.exports = User;