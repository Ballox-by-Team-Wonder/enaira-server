const router = require('express').Router();
const { payForPrivateMemory } = require('../controllers/stripe.controller');
const { auth } = require('../middleware/auth.middleware')


router.post('/:memoryID', auth, payForPrivateMemory)

module.exports = router