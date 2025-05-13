const express = require('express');
const router = express.Router();
const { storeTemplate,getStoryByRestaurantKeyword  } = require('../controllers/generateStoryController');

router.get('/:keyword', getStoryByRestaurantKeyword);
// router.post('/store', storeTemplate);

module.exports = router;
