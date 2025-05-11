const mustache = require('mustache');
const fs = require('fs');
const path = require('path');

exports.renderAmpStory = (data) => {
  const templatePath = path.join(__dirname, '../views/slide.mustache');
  const template = fs.readFileSync(templatePath, 'utf8');
  return mustache.render(template, data);
};
