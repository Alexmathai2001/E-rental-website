const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    serialnumber : Number,
    productname : String,
    brandname : String,
    productid : mongoose.Schema.Types.Mixed,
    category : String,
    regularprice : Number,
    discountpercentage : Number,
    bestseller : Boolean,
    creationdate : Date,
    stockstatus : String,
    productcondition : String,
    productdescription : String,
    imageurl : String
})

const categorySchema = mongoose.Schema({
    categoryname : String,
    showstatus : String,
    categoryimgurl : String,
    cloudinaryId : String,
    products : [productSchema]
})

module.exports = mongoose.model('category',categorySchema)