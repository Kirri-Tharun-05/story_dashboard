// const { fetchStoryFromDB } = require('../models/templateModel');

// exports.fetchMcpData = async (keyword) => {
//   // Simulate calling the MCP server — for now, just pull from DB
//   const template = await fetchStoryFromDB(keyword);
//   console.log("Template Data : ", template);

//   if (!template) {
//     throw new Error(`No template found for keyword: ${keyword}`);
//   }

//   return {
//     title: template.title,
//     slides: template.slides
//   };
// };


// for resturant data
const { fetchStoryFromDB } = require('../models/templateModel');

exports.fetchMcpData = async (keyword) => {
  // Fetch template from DB using the keyword
  // console.log(keyword);
  const template = await fetchStoryFromDB(keyword);
  // console.log("Template Data : ", template);

  if (!template) {
    throw new Error(`No template found for keyword: ${keyword}`);
  }

  // Return the correct data structure
  return {
    title: template.story_title,  // Corrected to match the field from fetchStoryFromDB
    slides: template.story_data   // Corrected to match the field from fetchStoryFromDB
  };
};


exports.fetchMcpDataForRestaurant = async (keyword) => {
  // Fetch template from DB using the keyword
  // console.log(keyword);
  const template = await fetchStoryFromDB(keyword);
  // console.log("Template Data : ", template);

  if (!template) {
    throw new Error(`No template found for keyword: ${keyword}`);
  }
restaurant
  // Return the correct data structure
  return {
    title: template.story_title,  // Corrected to match the field from fetchStoryFromDB
    slides: template.story_data   // Corrected to match the field from fetchStoryFromDB
  };
};
