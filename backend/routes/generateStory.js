const express = require('express');
const router = express.Router();
const { getStoryByKeyword, storeTemplate } = require('../controllers/generateStoryController');

router.get('/:keyword', getStoryByKeyword);
// router.post('/store', storeTemplate);

module.exports = router;
