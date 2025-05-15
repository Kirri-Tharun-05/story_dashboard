const { fetchTemplateFromDB, saveTemplateToDB } = require('../models/templateModel');
const path=require('path');
const { renderAmpStory,renderAmpStoryForRestaurant,renderAmpStoryForTestOne,renderAmpStoryForTestTwo } = require('../services/ampRenderer');
const { fetchMcpData } = require('../services/mcpService');
const { fetchMcpData1 } = require('../services/mcpService2');
const fs = require('fs');


exports.getStoryByKeyword = async (req, res) => {
  // const { keyword } = req.params;
  const keyword = decodeURIComponent(req.params.keyword);
  console.log(keyword);
  // console.log(keyword);
  try {
    const data = await fetchMcpData(keyword); // mock content
    // console.log("Data : ",data)
    const ampHtml = renderAmpStory(data);
    // console.log(ampHtml);
    res.setHeader('Content-Type', 'text/html');
    res.send(ampHtml);
  } catch (err) {
    console.error('Error fetching template:', err);
    res.status(500).json({ error: 'Failed to fetch template' });
  }
};
exports.getStoryByRestaurantKeyword = async (req, res) => {
  const { keyword } = req.params;
  // console.log(keyword);
  try {
    const data = await fetchMcpData1(keyword); // mock content
    // console.log("Data : ",data)
    const ampHtml = renderAmpStoryForRestaurant(data);
    // console.log(ampHtml);
    res.setHeader('Content-Type', 'text/html');
    res.send(ampHtml);
  } catch (err) {
    console.error('Error fetching template:', err);
    res.status(500).json({ error: 'Failed to fetch template' });
  }
};



exports.getStoryForTestOne = async (req, res) => {
  const { keyword } = req.params;
  console.log(keyword);
  try {
    const data = await fetchMcpData1(keyword); // mock content
    // console.log("Data : ",data)
    const ampHtml = renderAmpStoryForTestOne(data);
    // console.log(ampHtml);
    res.setHeader('Content-Type', 'text/html');
    res.send(ampHtml);
  } catch (err) {
    console.error('Error fetching template:', err);
    res.status(500).json({ error: 'Failed to fetch template' });
  }
};

exports.getStoryForTestTwo = async (req, res) => {
  const { keyword } = req.params;
  // console.log(keyword);
  try {
    const data = await fetchMcpData1(keyword); // mock content
    // console.log("Data : ",data)
    const ampHtml = renderAmpStoryForTestTwo(data);
    // console.log(ampHtml);
    res.setHeader('Content-Type', 'text/html');
    res.send(ampHtml);
  } catch (err) {
    console.error('Error fetching template:', err);
    res.status(500).json({ error: 'Failed to fetch template' });
  }
};


