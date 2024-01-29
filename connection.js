const mongoose = require('mongoose')

const connectdb = async () => {
  try {
    const connection = await mongoose.connect('mongodb+srv://alexmathai07:Alexmathai@torqerentals.ftntmwz.mongodb.net/Torq?retryWrites=true&w=majority');
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};



module.exports = connectdb