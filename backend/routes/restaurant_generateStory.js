const express = require('express');
const router = express.Router();
const { storeTemplate,getStoryByRestaurantKeyword,getStoryForTestOne,getStoryForTestTwo  } = require('../controllers/generateStoryController');

router.get('/:keyword', getStoryByRestaurantKeyword);
router.get('/test1/:keyword',getStoryForTestOne);
router.get('/test2/:keyword',getStoryForTestTwo);
// router.post('/store', storeTemplate);

module.exports = router;
