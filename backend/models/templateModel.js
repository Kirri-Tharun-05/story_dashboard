// fetch data from database
const pool = require('../init_db');

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


exports.fetchStoryFromDBForRestaurant = async (categoryName) => {
  const result = await pool.query(
    `SELECT 
        r.name AS restaurant_name,
        r.address,
        r.contact,
        r.zomato_url,
        r.opening_hours,
        r.avg_cost,
        r.image_url AS restaurant_image,
        c.name AS category_name,
        d.name AS dish_name,
        d.description AS dish_description,
        d.price AS dish_price,
        d.image_url AS dish_image
     FROM categories c
     JOIN restaurants_jaipur r ON c.restaurant_id = r.id
     JOIN dishes d ON d.category_id = c.id
     WHERE c.name ILIKE $1`,
    [`%${categoryName}%`]
  );

  if (result.rows.length === 0) {
    throw new Error('Story not found for this category');
  }

  const restaurant = {
    name: result.rows[0].restaurant_name,
    address: result.rows[0].address,
    contact: result.rows[0].contact,
    zomato_url: result.rows[0].zomato_url,
    opening_hours: result.rows[0].opening_hours,
    avg_cost: result.rows[0].avg_cost,
    image_url: result.rows[0].restaurant_image,
    category: result.rows[0].category_name,
    dishes: result.rows.map(row => ({
      name: row.dish_name,
      description: row.dish_description,
      price: row.dish_price,
      image_url: row.dish_image
    }))
  };

  // Structure for AMP Mustache template
  return {
    story_title: `${restaurant.category} at ${restaurant.name}`,
    story_data: restaurant
  };
};

exports.getAllCategories = async () => {
  const result = await pool.query('SELECT name FROM categories ORDER BY name ASC');
  return result.rows.map(row => row.name); 
};