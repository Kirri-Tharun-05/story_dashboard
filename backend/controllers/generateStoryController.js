const { fetchTemplateFromDB, saveTemplateToDB } = require('../models/templateModel');
const path=require('path');
const { renderAmpStory } = require('../services/ampRenderer');
const { fetchMcpData } = require('../services/mcpService');

// exports.getStoryByKeyword = async (req, res) => {
//   const { keyword } = req.params;
//   console.log(keyword);
//   try {
//     const data = await fetchMcpData(keyword); // mock content
//     const ampHtml = renderAmpStory(data);
//     console.log(ampHtml);
//     res.setHeader('Content-Type', 'text/html');
//     res.send(ampHtml);
//   } catch (err) {
//     console.error('Error fetching template:', err);
//     res.status(500).json({ error: 'Failed to fetch template' });
//   }
// };



// if not work then remove this and include the upper part which is commented
exports.getStoryByKeyword = async (req, res) => {
  const { keyword } = req.params;
  console.log(keyword);

  try {
    const data = await fetchMcpData(keyword); // Fetch from DB
    const ampHtml = renderAmpStory(data); // Convert to AMP HTML

    // Save HTML to /stories directory
    const storyPath = path.join(__dirname, '../stories', `${keyword}.html`);
    fs.writeFileSync(storyPath, ampHtml);

    // Return only success
    res.status(200).json({ success: true, storyUrl: `/stories/${keyword}.html` });
  } catch (err) {
    console.error('Error fetching template:', err);
    res.status(500).json({ error: 'Failed to fetch or save template' });
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