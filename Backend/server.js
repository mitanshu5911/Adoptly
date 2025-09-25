const express = require('express');
const app = express();
const connectDB = require('./config/db');
require('dotenv').config();
const cors = require('cors');
const cloudinary = require('cloudinary').v2;


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB();
app.use(express.json());
app.use(cors());
app.use('/api', require('./routes/auth'));
app.use('/api',require('./routes/Pet'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

