const express = require('express');
const router = express.Router();
const { getAmpStoryPublicTest1, getAmpStoryPublicTest2 } = require('../controllers/publicAmpController');

router.get('/test1/:keyword', getAmpStoryPublicTest1);
router.get('/test2/:keyword', getAmpStoryPublicTest2);

module.exports = router;
