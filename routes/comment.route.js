const router = require('express').Router();
const { createComment, getCommentsForMemory } = require('../controllers/comment.controller');
const { auth } = require('../middleware/auth')


router.get('/:memoryID', getCommentsForMemory)
router.post('/:memoryID', auth, createComment)

module.exports = router