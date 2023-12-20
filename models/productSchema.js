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

module.exports = mongoose.model('product',productSchema)