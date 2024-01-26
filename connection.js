const mongoose = require('mongoose')

const connectdb = async () => {
  const connection = await mongoose.connect('mongodb+srv://alexmathai07:Alexmathai@torqerentals.ftntmwz.mongodb.net/Torq?retryWrites=true&w=majority');
}


module.exports = connectdb