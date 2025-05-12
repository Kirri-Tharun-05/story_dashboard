// fetch data from database
const pool = require('../init_db');

// Fetch story and slides based on storytitle
exports.fetchStoryFromDB = async (storytitle) => {
  const result = await pool.query(
    `SELECT * FROM posts WHERE storytitle ILIKE $1 LIMIT 1`,
    [`%${storytitle}%`]
  );

  if (result.rows.length === 0) {
    throw new Error('Story not found');
  }

  const post = result.rows[0];

  const slidesResult = await pool.query(
    `SELECT slide_number, slide_title, slide_content, slide_image_url
     FROM slides WHERE post_id = $1 ORDER BY slide_number`,
    [post.id]
  );

  const slides = slidesResult.rows.map(slide => ({
    heading: slide.slide_title,
    content: slide.slide_content,
    background: slide.slide_image_url,
    index:slide.slide_number
  }));

  return {
    storytitle: post.storytitle,
    slides
  };
};

// Save new story and its slides into DB
// exports.saveStoryToDB = async ({ storytitle, metadescription, metakeywords, tags, category, slides }) => {
//   const client = await pool.connect();
//   try {
//     await client.query('BEGIN');

//     const insertPost = await client.query(
//       `INSERT INTO posts (canurl, storytitle, metadescription, metakeywords, tags, category)
//        VALUES ($1, $2, $3, $4, $5, $6)
//        RETURNING id`,
//       [
//         storytitle.toLowerCase().replace(/\s+/g, '-'),
//         storytitle,
//         metadescription || '',
//         metakeywords || '',
//         tags || [],
//         category || ''
//       ]
//     );

//     const postId = insertPost.rows[0].id;

//     for (let i = 0; i < slides.length; i++) {
//       const slide = slides[i];
//       await client.query(
//         `INSERT INTO slides (post_id, slide_number, slide_title, slide_content, slide_image_url)
//          VALUES ($1, $2, $3, $4, $5)`,
//         [
//           postId,
//           i + 1,
//           slide.heading,
//           slide.content,
//           slide.background
//         ]
//       );
//     }

//     await client.query('COMMIT');
//   } catch (err) {
//     await client.query('ROLLBACK');
//     throw err;
//   } finally {
//     client.release();
//   }
// };
