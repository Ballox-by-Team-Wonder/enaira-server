const router = require('express').Router();
const { login, signup, getLoggedInUser } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth')

router.post('/signup', signup)
router.post('/login', login)
router.get('/getLoggedInUser', auth, getLoggedInUser)

module.exports = router