const { fetchTemplateFromDB, saveTemplateToDB } = require('../models/templateModel');
const { renderAmpStory } = require('../services/ampRenderer');
const { fetchMcpData } = require('../services/mcpService');

exports.getStoryByKeyword = async (req, res) => {
  const { keyword } = req.params;
  console.log(keyword);
  try {
    const data = await fetchMcpData(keyword); // mock content
    const ampHtml = renderAmpStory(data);
    console.log(ampHtml);
    res.send(ampHtml);
  } catch (err) {
    console.error('Error fetching template:', err);
    res.status(500).json({ error: 'Failed to fetch template' });
  }
};

// exports.storeTemplate = async (req, res) => {
//   const { keyword, data } = req.body;
//   try {
//     await saveTemplateToDB(keyword, data);
//     res.json({ success: true });
//   } catch (err) {
//     console.error('Error storing template:', err);
//     res.status(500).json({ error: 'Failed to store template' });
//   }
// };