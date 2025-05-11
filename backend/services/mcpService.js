const { fetchStoryFromDB } = require('../models/templateModel');

exports.fetchMcpData = async (keyword) => {
  // Simulate calling the MCP server — for now, just pull from DB
  const template = await fetchStoryFromDB(keyword);

  if (!template) {
    throw new Error(`No template found for keyword: ${keyword}`);
  }

  return {
    title: template.title,
    slides: template.slides
  };
};
