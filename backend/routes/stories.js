// // routes/stories.js
// const express = require('express');
// const router = express.Router();
// const pool = require('../init_db');

// // GET /api/stories/by-writer?writername=abc
// router.get('/by-writer', async (req, res) => {
//   const { writername } = req.query;

//   if (!writername) {
//     return res.status(400).json({ error: 'Writer name is required' });
//   }

//   try {
//     const result = await pool.query(
//       'SELECT * FROM stories WHERE writername ILIKE $1',
//       [`%${writername}%`] // partial match, case-insensitive
//     );
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching stories:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;

// with images 


const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const pool = require('../init_db');
const router = express.Router();

router.get('/by-writer', async (req, res) => {
  try {
    const { writername } = req.query;
    console.log(writername);
    const result = await pool.query(
      'SELECT * FROM stories WHERE writername ILIKE $1',
      [`%${writername}%`]
    );
    console.log(result);
    const storiesWithImages = await Promise.all(
      result.rows.map(async (story) => {
        try {
          const response = await axios.get(story.canurl);
          const $ = cheerio.load(response.data);

          // Try to get amp-img inside #cover page
          let imageUrl = $('amp-story-page#cover amp-img').attr('src');

          // Fallback to first amp-img
          if (!imageUrl) {
            imageUrl = $('amp-img').first().attr('src');
          }

          return { ...story, image: imageUrl || null };
        } catch (err) {
          console.error(`Error fetching AMP image for ${story.canurl}`);
          return { ...story, image: null };
        }
      })
    );

    res.json(storiesWithImages);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
