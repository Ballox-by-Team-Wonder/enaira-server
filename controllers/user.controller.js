const User = require('../models/user.model')
const Token = require('../models/token.model')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { sendMail } = require('../services/sendMail.service')
const { OAuth2Client } = require('google-auth-library');
const jwtDecode = require("jwt-decode");
const { signJwtToken } = require('../services/auth.service');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

async function signup(req, res) {
    const { name, email, password, confirmPassword } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if(existingUser) return res.status(400).json({ message: "User already exists"})
        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" })
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ name, email, imageUrl: '', password: hashedPassword })
        const token = signJwtToken(result._id, result.email)
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
        const token = signJwtToken(existingUser._id, existingUser.email)
        res.status(200).json({ result: existingUser, token })

    } catch (error) {
        return res.status(500).json({ message: "something went wrong" })
    }
}


async function getLoggedInUser(req, res) {
    try {
        const result = await User.findById(req.userID)
        if (!result) return res.status(404).json({ message: "user not found" })
        res.status(200).json(result)
        
    } catch (err) {
        return res.status(500).json({ message: "something went wrong" })
    }
}


async function forgotPassword(req, res) {
    const { email } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: "User does not exist" })
        const token = await Token.findOne({ user: user._id })
        if (token) await token.deleteOne()
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(resetToken, 12)
        await Token.create({ token: hashedToken, user: user, createdAt: Date.now() })
        const resetLink = `https://samuel-travel-memories.netlify.app/reset-password?token=${resetToken}&userID=${user._id}`
        sendMail(user.email, "Password Reset Request", { name: user.name, link: resetLink }, "../utils/templates/resetPasswordRequest.handlebars");
        res.status(200).json({ result: 'success' });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "something went wrong" })
    }
}


async function resetPassword(req, res) {
    const { token, userID, password } = req.body

    try {
        const passwordResetToken = await Token.findOne({ user: userID.toString() })
        if (!passwordResetToken) return res.status(404).json({ message: "Invalid or expired token" })
        const isValidToken = await bcrypt.compare(token, passwordResetToken.token)
        if (!isValidToken) return res.status(400).json({ message: "Token is invalid" })
        const hashedPassword = await bcrypt.hash(password, 12)
        await User.findOneAndUpdate({ _id: userID }, { password: hashedPassword })
        await passwordResetToken.deleteOne();
        res.status(200).json({ result: 'successfully changed password' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'your request could not be processed' })
    }
}


async function loginWithGoogle(req, res) {
    const { code } = req.body
    const oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, 'postmessage')

    try {
        const { tokens } = await oAuth2Client.getToken(code)
        const { name, email } = jwtDecode(tokens.id_token)

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            const token = signJwtToken(existingUser._id, existingUser.email)
            return res.status(200).json({ result: existingUser, token })
        } else {
            const result = await User.create({ name, email })
            const token = signJwtToken(result._id, result.email)
            return res.status(201).json({ result, token })
        }    
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }
}


module.exports = {
    signup,
    login,
    getLoggedInUser,
    forgotPassword,
    resetPassword,
    loginWithGoogle
}