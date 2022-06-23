const router = require('express').Router();
const { login, signup, getLoggedInUser, forgotPassword, resetPassword, loginWithGoogle } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth.middleware');
const { validateSignup, validateLogin, validateForgotPassword } = require('../middleware/validation.middleware');

router.post('/signup', validateSignup, signup)
router.post('/login', validateLogin, login)
router.get('/getLoggedInUser', auth, getLoggedInUser)
router.post('/forgotPassword', validateForgotPassword, forgotPassword)
router.post('/resetPassword', resetPassword)
router.post('/loginWithGoogle', loginWithGoogle)

module.exports = router