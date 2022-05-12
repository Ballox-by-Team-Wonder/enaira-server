const router = require('express').Router();
const { saveMemory } = require('../controllers/memory.controller');
const { auth } = require('../middleware/auth');
const { imageUpload } = require('../middleware/imageUpload');

router.post('/', auth, imageUpload, saveMemory)

module.exports = router