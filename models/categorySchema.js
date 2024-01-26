const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    categoryname : String,
    showstatus : String,
    productscount : Number,
    categoryimgurl : String,
    cloudinaryId : String
})

module.exports = mongoose.model('category',categorySchema)