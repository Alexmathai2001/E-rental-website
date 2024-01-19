const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    productid : mongoose.Schema.Types.ObjectId,
    quantity : Number
})

const addressSchema = mongoose.Schema({
    name : String,
    houseno : String,
    roadname : String,
    city : String,
    state : String,
    pin : Number,
    phone : Number
})

const adminorderSchema = mongoose.Schema({
    items : [itemSchema],
    address : [addressSchema],
    modeofpayment : String,
    discount : Number,
    totalamount : Number,
    orderdate : String,
    status : String,
    deliverydate : Date,
    returndate : Date,
    customername : String
})



module.exports = mongoose.model('adminorder',adminorderSchema)