const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    productid : { type: mongoose.Schema.Types.ObjectId, ref: 'product'},
    days : Number
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

const orderSchema = mongoose.Schema({
    productid : mongoose.Schema.Types.ObjectId,
    rentdate : Date,
    status : String,
})

const customerschema = mongoose.Schema({
    name : String,
    phone : Number,
    email : String,
    status : String,
    address : [addressSchema],
    cart : [cartSchema],
    orders : [orderSchema]
})



module.exports = mongoose.model('customer',customerschema)