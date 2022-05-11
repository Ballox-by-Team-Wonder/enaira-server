const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function signup(req, res) {
    const { name, email, password, confirmPassword } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if(existingUser) return res.status(400).json({ message: "User already exists"})

        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match"})

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ name, email, imageUrl: '', password: hashedPassword })

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SIGNATURE, { expiresIn: "24h" })

        res.status(201).json({ result, token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "something went wrong"})
    }
}


async function login(req, res) {

    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if(!existingUser) return res.status(404).json({ message: "User isn't registered" })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials"})

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SIGNATURE, { expiresIn: "24h" })

        res.status(200).json({ result: existingUser, token })

    } catch (error) {
        return res.status(500).json({ message: "something went wrong" })
    }
}


module.exports = {
    signup,
    login
}