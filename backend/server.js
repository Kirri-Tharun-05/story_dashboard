const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config(); // Load environment variables
const storiesRoutes=require('./routes/stories.js')
const generateStoriesRoute=require('./routes/generateStory.js')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/stories', storiesRoutes);
app.use('/api/generateStory',generateStoriesRoute);


// updated if not work then remove this .
app.use('/stories', express.static(path.join(__dirname, 'stories')));

app.get('/', (req, res) => {
  res.send("Running")
})
// app.get('/api/template/:keyword', async (req, res) => {
//   const { keyword } = req.params;
//   try {
//     const result = await pool.query(
//       'SELECT title, slides FROM templates WHERE keyword = $1 LIMIT 1',
//       [keyword.toLowerCase()]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'Template not found' });
//     }

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error('Error fetching template:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
