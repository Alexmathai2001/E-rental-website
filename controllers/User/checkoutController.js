const userdata = require('../../models/customerSchema')
const products = require('../../models/productSchema')
const {ObjectId} = require('mongodb')

module.exports = {
    get : async (req,res) => {
        res.locals.title = "Order Checkout"
        const address = await userdata.find({ 'address': { $exists: true, $not: { $size: 0 } } })
        if(address == ""){
            res.redirect('/user/address')
        }else{
            const user = await userdata.findOne({"phone":req.session.userid})
            const userAddresses = user.address;
            const usercart = await userdata.findOne({ phone: req.session.userid })
                    .populate('cart.productid');
            userDetails = usercart.cart.reverse()
            const totalRegularPrice = userDetails.reduce((sum, data) => {
                // Multiply the regular price by the number of days for each product
                return sum + (data.productid.regularprice * data.days);
              }, 0);
            const totalSalePrice = userDetails.reduce((sum, data) => {
                return sum + (data.productid.saleprice * data.days)
            }, 0);
            const totalDiscount = totalRegularPrice - totalSalePrice
            res.render("Users/checkout",{userAddresses,userDetails,totalRegularPrice,totalSalePrice,totalDiscount})
        }

    },
    getbuynow : async (req,res) => {
        const productid = req.params.id;
        res.locals.title = "Order Checkout"        
        const address = await userdata.find({ 'address': { $exists: true, $not: { $size: 0 } } })
        if(address == ""){
            res.redirect('/user/address')
        }else{
            const user = await userdata.findOne({"phone":req.session.userid})
            const userAddresses = user.address;
            let data = await products.findById(productid)
            let data1 = {
                productid : data,
                days:req.body.days
            }
            userDetails = [data1]
            const totalRegularPrice = data.regularprice * req.body.days
            const totalSalePrice = data.saleprice * req.body.days
            const totalDiscount = totalRegularPrice - totalSalePrice
           res.render("Users/checkout",{userAddresses,userDetails,totalRegularPrice,totalSalePrice,totalDiscount})
        }
    },
    post : async (req,res) => {
        console.log(req.body.address);
        console.log(req.body.rentdate);
        console.log(req.body.paymenttype);
    }
}