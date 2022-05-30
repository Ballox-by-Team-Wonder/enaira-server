const router = require('express').Router();
const { createMessage, getMessagesForMemory, getAllMessages } = require('../controllers/message.controller');
const { auth } = require('../middleware/auth')

router.get('/', getAllMessages)
router.get('/:memoryID', getMessagesForMemory)
router.post('/:memoryID', auth, createMessage)

module.exports = router