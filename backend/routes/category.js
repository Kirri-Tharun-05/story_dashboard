// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { getAllCategories } = require('../models/templateModel');

router.get('/category', async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
