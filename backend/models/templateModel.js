// fetch data from database
const pool = require('../init_db');

// Fetch story and slides based on storytitle
// exports.fetchStoryFromDB = async (storytitle) => {
//   const result = await pool.query(
//     `SELECT * FROM posts WHERE storytitle ILIKE $1 LIMIT 1`,
//     [`%${storytitle}%`]
//   );

//   if (result.rows.length === 0) {
//     throw new Error('Story not found');
//   }

//   const post = result.rows[0];

//   const slidesResult = await pool.query(
//     `SELECT slide_number, slide_title, slide_content, slide_image_url
//      FROM slides WHERE post_id = $1 ORDER BY slide_number`,
//     [post.id]
//   );

//   const slides = slidesResult.rows.map(slide => ({
//     heading: slide.slide_title,
//     content: slide.slide_content,
//     background: slide.slide_image_url,
//     index:slide.slide_number
//   }));

//   return {
//     storytitle: post.storytitle,
//     slides
//   };
// };
// exports.fetchStoryFromDB = async (storyTitle) => {
//   const result = await pool.query(
//     `SELECT * FROM web_stories WHERE story_title ILIKE $1 LIMIT 1`,
//     [`%${storyTitle}%`]
//   );

//   if (result.rows.length === 0) {
//     throw new Error('Story not found');
//   }

//   const story = result.rows[0];

//   // Parse the JSONB `slides` field
//   const slides = story.slides.map(slide => {
//     // Wrap each slide in a 'type' object to work with {{#type}}{{#intro}}...{{/intro}}{{/type}} in Mustache
//     return {
//       type: {
//         intro: slide.intro ? true : undefined,
//         restaurant: slide.restaurant ? true : undefined,
//         outro: slide.outro ? true : undefined
//       },
//       ...slide
//     };
//   });

//   return {
//     story_title: story.story_title,
//     slides
//   };
// };

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


// for resturant stories

// exports.fetchStoryFromDB = async (storyTitle) => {
//   const result = await pool.query(
//     `SELECT * FROM  WHERE story_title ILIKE $1 LIMIT 1`,
//     [`%${storyTitle}%`]
//   );

//   if (result.rows.length === 0) {
//     throw new Error('Story not found');
//   }

//   const story = result.rows[0];

//   // Assuming the fields exist in the database for each story
//   const storyData = {
//     name: story.name,
//     image_urls: story.image_urls,  // Assuming this is an array of image URLs
//     cuisine: story.cuisine,
//     average_cost: story.average_cost,
//     location: story.location,
//     timing: story.timing,
//     ambiance_desc: story.ambiance_desc,
//     zomato_link: story.zomato_link
//   };

//   // Return the data in a format that will be used by the AMP Mustache template
//   return {
//     story_title: story.story_title,
//     story_data: storyData
//   };
// };
exports.fetchStoryFromDB = async (storyTitle) => {
  // Perform a JOIN to fetch the restaurant info and details based on the story title
  const result = await pool.query(
    `SELECT r.name, rd.image_urls, rd.cuisine, rd.average_cost, rd.location, 
            rd.timing, rd.ambiance_desc, rd.zomato_link
     FROM restaurants r
     JOIN restaurant_details rd ON r.id = rd.restaurant_id
     WHERE r.name ILIKE $1
     LIMIT 1`,
    [`%${storyTitle}%`]
  );

  if (result.rows.length === 0) {
    throw new Error('Story not found');
  }

  const restaurant = result.rows[0];

  // Prepare the restaurant data for the AMP Mustache template
  const storyData = {
    name: restaurant.name,
    image_urls: restaurant.image_urls,  // Array of image URLs
    cuisine: restaurant.cuisine,
    average_cost: restaurant.average_cost,
    location: restaurant.location,
    timing: restaurant.timing,
    ambiance_desc: restaurant.ambiance_desc,
    zomato_link: restaurant.zomato_link
  };

  // Return the data in a format to be used by the AMP Mustache template
  return {
    story_title: restaurant.name,  // Use the restaurant name as the story title
    story_data: storyData
  };
};
