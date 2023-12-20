const mongoose = require('mongoose')

const adminorderSchema = mongoose.Schema({
    items : [itemSchema],
    address : [addressSchema],
    modeofpayment : String,
    discount : Number,
    totalamount : Number,
    orderdate : Date,
    status : String,
    deliverydate : Date,
    returndate : Date,
    customername : String
})

const itemSchema = mongoose.Schema({
    productid : mongoose.Schema.Types.ObjectId,
    productname : String,
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

module.exports = mongoose.model('adminorder',adminorderSchema)