const mustache = require('mustache');
const fs = require('fs');
const path = require('path');

exports.renderAmpStory = (data) => {
  // const templatePath = path.join(__dirname, '../views/1.mustache');
  const templatePath = path.join(__dirname, '../views/Zomato3.mustache');
  const template = fs.readFileSync(templatePath, 'utf8');
  return mustache.render(template, data);
};

// [
//   "https://b.zmtcdn.com/data/reviews_photos/cd1/ad792e8aa146372019c126b2e9435cd1_1651951373.jpg?output-format=webp",
//   "https://b.zmtcdn.com/data/pictures/4/101834/60fa205b682bf4695f63f2a0066b87ad.jpg?output-format=webp",
//   "https://b.zmtcdn.com/data/pictures/4/101834/6081d22defff937392e83fd93c99f3d6.jpg?output-format=webp",
//   "https://b.zmtcdn.com/data/pictures/4/101834/c5e40519da0b63f65f6500490be6b74e.jpg?output-format=webp",
//   "https://b.zmtcdn.com/data/pictures/4/101834/19ef5100598ba500db9778e50a2e5d10.jpg?output-format=webp"
// ]