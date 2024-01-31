const mongoose = require('mongoose')
require("dotenv").config()

const connectdb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_CONNECT);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};



module.exports = connectdb