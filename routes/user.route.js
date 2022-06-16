const router = require('express').Router();
const { login, signup, getLoggedInUser, forgotPassword, resetPassword, loginWithGoogle } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth.middleware')

router.post('/signup', signup)
router.post('/login', login)
router.get('/getLoggedInUser', auth, getLoggedInUser)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)
router.post('/loginWithGoogle', loginWithGoogle)

module.exports = router