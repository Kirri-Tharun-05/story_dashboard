const express = require('express');
const router = express.Router();
const { getTemplateByKeyword, storeTemplate } = require('../controllers/templateController');

router.get('/:authorName', getTemplateByKeyword);
router.post('/store', storeTemplate);

module.exports = router;
