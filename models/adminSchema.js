const mongoose = require('mongoose')


const adminschema = mongoose.Schema({
    username : String,
    phone : Number,
    email : String,
    gender : String,
    password : String
})



module.exports = mongoose.model('admin',adminschema)