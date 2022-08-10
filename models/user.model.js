const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true, trim: true, minlength: 3 },
    lastName: { type: String, required: true, trim: true, minlength: 3 },
    email: { type: String, required: true, unique: true},
    homeTown: { type: String, required: false },
    lga: { type: String, required: false },
    state: { type: String, required: false },
    religion: { type: String, required: false },
    institution: { type: String, required: false },
    password: { type: String }
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema)

module.exports = User;