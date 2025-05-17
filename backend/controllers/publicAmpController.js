const { renderAmpStoryForTestOne1, renderAmpStoryForTestTwo2 } = require('../services/ampRenderer'); 
const { fetchMcpData1 } = require('../services/mcpService2'); // use your real function

exports.getAmpStoryPublicTest1 = async (req, res) => {
  const { keyword } = req.params;
  try {
    const data = await fetchMcpData1(keyword);
    const protocol = req.protocol; // 'http' or 'https'
    const host = req.get('host');  // e.g. 'localhost:5000'
    const canonicalUrl = `${protocol}://${host}/stories/test1/${encodeURIComponent(keyword)}`;
    
    // Add to data
    data.canonical_url = canonicalUrl;
    const ampHtml = renderAmpStoryForTestOne1(data);
    res.setHeader('Content-Type', 'text/html');
    res.send(ampHtml);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load AMP story.');
  }
};

exports.getAmpStoryPublicTest2 = async (req, res) => {
  const { keyword } = req.params;
  try {
    const data = await fetchMcpData1(keyword);
     const protocol = req.protocol; // 'http' or 'https'
    const host = req.get('host');  // e.g. 'localhost:5000'
    const canonicalUrl = `${protocol}://${host}/stories/test1/${encodeURIComponent(keyword)}`;

    // Add to data
    data.canonical_url = canonicalUrl;
    const ampHtml = renderAmpStoryForTestTwo2(data);
    console.log(ampHtml);
    res.setHeader('Content-Type', 'text/html');
    res.send(ampHtml);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load AMP story.');
  }
};
