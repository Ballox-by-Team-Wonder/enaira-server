const router = require('express').Router();
const { login, signup, getLoggedInUser, updateUser, incrementUserPoints } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth.middleware');
const { validateSignup, validateLogin } = require('../middleware/validation.middleware');


router.post('/signup', validateSignup, signup)
router.post('/login', validateLogin, login)
router.get('/getLoggedInUser', auth, getLoggedInUser)
router.patch('/updateUser', auth, updateUser)
router.get('/incrementUserPoints', auth, incrementUserPoints)

module.exports = router