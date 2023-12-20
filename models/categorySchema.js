const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    categoryname : String,
    showstatus : Boolean
})

module.exports = mongoose.model('category',categorySchema)