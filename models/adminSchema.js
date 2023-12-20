const mongoose = require('mongoose')


const adminschema = mongoose.Schema({
    name : String,
    phone : Number,
    email : String,
    gender : String,
    password : String
})



module.exports = mongoose.model('admin',adminschema)