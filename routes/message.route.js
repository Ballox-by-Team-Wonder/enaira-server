const router = require('express').Router();
const { createMessage, getMessagesForMemory } = require('../controllers/message.controller');
const { auth } = require('../middleware/auth')


router.get('/:memoryID', getMessagesForMemory)
router.post('/:memoryID', auth, createMessage)

module.exports = router