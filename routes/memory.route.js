const router = require('express').Router();
const { saveMemory, getMemories } = require('../controllers/memory.controller');
const { auth } = require('../middleware/auth');
const { imageUpload } = require('../middleware/imageUpload');

router.post('/', auth, imageUpload, saveMemory)
router.get('/', getMemories)

module.exports = router