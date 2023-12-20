const mongoose = require('mongoose')

const connectdb = async () => {
  const connection = await mongoose.connect('mongodb://127.0.0.1:27017/Torq');
}





module.exports = connectdb