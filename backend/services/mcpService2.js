// const { fetchStoryFromDBForRestaurant } = require('../models/templateModel');

// exports.fetchMcpData1= async (keyword) => {
//   // Fetch template from DB using the keyword
//   console.log(keyword);
//   const template = await fetchStoryFromDBForRestaurant(keyword);
//   console.log("Template Data : ", template);

//   if (!template) {
//     throw new Error(`No template found for keyword: ${keyword}`);
//   }

//   // Return the correct data structure
//   return {
//     title: template.story_title,  // Corrected to match the field from fetchStoryFromDB
//     slides: template.story_data   // Corrected to match the field from fetchStoryFromDB
//   };
// };
const { fetchStoryFromDBForRestaurant } = require('../models/templateModel');

// exports.fetchMcpData1 = async (categoryKeyword) => {
//   console.log('Category Keyword:', categoryKeyword);

//   // Fetch story data using category name
//   const template = await fetchStoryFromDBForRestaurant(categoryKeyword);
//   console.log("Template Data:", template);

//   if (!template) {
//     throw new Error(`No story found for category: ${categoryKeyword}`);
//   }

//   return {
//     title: template.story_title,     // e.g., "Jars N More - Classic Flavours"
//     slides: template.story_data      // Contains intro info, dish slides, and outro data
//   };
// };
exports.fetchMcpData1 = async (categoryKeyword) => {
  // console.log('Category Keyword:', categoryKeyword);

  const template = await fetchStoryFromDBForRestaurant(categoryKeyword);
  // console.log("Template Data:", JSON.stringify(template, null, 2));

  if (!template) {
    throw new Error(`No story found for category: ${categoryKeyword}`);
  }

  const storyData = template.story_data;

  return {
    title: template.story_title,
    story_title: template.story_title,
    image_url: storyData.image_url,
    restaurant_name: storyData.name,
    address: storyData.address,
    contact: storyData.contact,
    opening_hours: storyData.opening_hours,
    avg_cost: storyData.avg_cost,
    zomato_url: storyData.zomato_url,
    category_name: storyData.category,
    dishes: storyData.dishes
  };
};

