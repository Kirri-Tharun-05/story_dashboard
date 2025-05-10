const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const routes = require('./routes/index');
// app.use('/api', routes);
app.get('/',(req,res)=>{
    res.send("Running")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
