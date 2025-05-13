const mustache = require('mustache');
const fs = require('fs');
const path = require('path');

exports.renderAmpStory = (data) => {
  // const templatePath = path.join(__dirname, '../views/1.mustache');
  const templatePath = path.join(__dirname, '../views/Zomato3.mustache');
  const template = fs.readFileSync(templatePath, 'utf8');
  return mustache.render(template, data);
};
exports.renderAmpStoryForRestaurant = (data) => {
  // const templatePath = path.join(__dirname, '../views/1.mustache');
  const templatePath = path.join(__dirname, '../views/jarsNMore.mustache');
  const template = fs.readFileSync(templatePath, 'utf8');
  return mustache.render(template, data);
};

// [
  // "https://b.zmtcdn.com/data/pictures/chains/5/20920615/5c13ba4541b16f7c71a83f78700ecb3c.jpg?output-format=webp",
  // "https://b.zmtcdn.com/data/pictures/chains/5/20920615/e56c6683695f8fc673ef52cb2b5cb9a3.jpg?output-format=webp",
  // "https://b.zmtcdn.com/data/pictures/5/20920615/95fd361164cbc02c060f42aabbad4f8f.jpg",
  // "https://b.zmtcdn.com/data/pictures/5/20920615/7f8e41eac15c957e6f98227caf8d8d08.jpg",
  // "https://b.zmtcdn.com/data/pictures/chains/5/20920615/c7b0eb108d4115b5ca05fe95ed6a011b.jpg"
// ]




// INSERT INTO restaurant_details (
//   restaurant_id,
//   location,
//   cuisine,
//   average_cost,
//   timing,
//   ambiance_desc,
//   zomato_link,
//   image_urls,
//   meta_description
// ) VALUES
// (
//   5,
//   'C Scheme, Jaipur',
//   'North Indian, Chinese, Fast Food, Street Food, Rajasthani, Shake, Desserts, Beverages',
//   1200,
//   '11 AM - 11 PM',
//   'Cozy ambiance with quick service, offering a variety of thalis and traditional Rajasthani dishes.',
//   'https://www.zomato.com/jaipur/thali-and-more-c-scheme',
//   ARRAY[
//     'https://b.zmtcdn.com/data/pictures/chains/5/102695/2cf0aa1880a31694bf8e929523276239.jpg',
//     'https://b.zmtcdn.com/data/pictures/chains/5/102695/30d603d198a5064bf2195cb8a4a3eeab.jpg',
//     'https://b.zmtcdn.com/data/pictures/chains/5/102695/552f1bfe89ae0a7ad88a1d669ac1b7f7.jpg',
//     'https://b.zmtcdn.com/data/pictures/chains/5/102695/d9947abe05782e7730e5b49b7af36e37.jpg',
//     'https://b.zmtcdn.com/data/pictures/5/102695/9c04c6e61de5a37519c031ccbc8b8fcc.jpg'
//   ],
//   'Experience a delightful variety of thalis and traditional Rajasthani cuisine at Thali And More in C Scheme, Jaipur.'
// ),
// (
//   4,
//   'C Scheme, Jaipur',
//   'South Indian',
//   1000,
//   '7 AM - 10 PM',
//   'Authentic South Indian flavors served in a serene setting inspired by Karnataka’s temple architecture.',
//   'https://www.zomato.com/jaipur/annpoornam-restaurant-c-scheme',
//   ARRAY[
//     'https://b.zmtcdn.com/data/pictures/3/20627013/4e9d40cc160a2c78ec7ebe043535b8c7.jpg',
//     'https://b.zmtcdn.com/data/pictures/chains/3/20627013/f56d0cf386c2a07a0da463030c3eaed6.jpg',
//     'https://b.zmtcdn.com/data/pictures/3/20627013/2afbc0765d5d944a1b64980351d6388f.jpg',
//     'https://b.zmtcdn.com/data/reviews_photos/700/3de42c8cdc06daff57a0c3db45852700_1709989444.jpg',
//     'https://b.zmtcdn.com/data/reviews_photos/700/3de42c8cdc06daff57a0c3db45852700_1709989444.jpg'
//   ],
//   'Savor authentic South Indian delicacies at Annpoornam Restaurant, a serene spot in C Scheme, Jaipur.'
// ),
// (
//   3,
//   'C Scheme, Jaipur',
//   'North Indian, Italian, Continental, Mexican, Pasta',
//   1800,
//   '12 PM - 11:30 PM',
//   'Elegant rooftop dining with live music, offering a fusion of global cuisines in a romantic setting.',
//   'https://www.zomato.com/jaipur/knighthouse-c-scheme',
//   ARRAY[
//     'https://b.zmtcdn.com/data/pictures/4/21158794/0343fb34f764acc292d15514cf357be4.jpeg',
//     'https://b.zmtcdn.com/data/pictures/chains/4/21158794/293cb5387b73b636e42d1dda6a5e42ce.jpeg',
//     'https://b.zmtcdn.com/data/reviews_photos/291/1bde7dc0fdd8298716d0d2c2c32be291_1720855056.jpg',
//     'https://b.zmtcdn.com/data/reviews_photos/9b7/0910ea8098481ca9db9830842e9fd9b7_1719562501.jpg',
//     'https://b.zmtcdn.com/data/reviews_photos/a60/edab4213fcb02738f6cee8cd1d19ea60_1740901884.jpg'
//   ],
//   'Enjoy a fusion of global cuisines with live music at KnightHouse, an elegant rooftop restaurant in C Scheme, Jaipur.'
// );
