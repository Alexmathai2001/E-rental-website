const userdata = require('../../models/customerSchema')
const products = require('../../models/productSchema')
const {ObjectId} = require('mongodb')

let producttosave = []

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
            producttosave = userDetails
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
    post : async (req,res) => {
        const user = await userdata.findOne({"phone":req.session.userid})
        // const userAddresses = user.address;
        // const usercart = await userdata.findOne({ phone: req.session.userid })
        //         .populate('cart.productid');
        // let userDetails = usercart.cart.reverse()
        const rentDate = req.body.rentdate;
        const newDateObject = addDaysToDate(rentDate);
        const formattedDate = formatDate(newDateObject);
        if (req.body.paymenttype == "cash on delivery") {
              const data = req.body.address.split("-")
              let dataObject = {
                "name" : data[0],
                "houseno" : data[1],
                "roadname": data[2],
                "city" : data[3],
                "state" : data[4],
                "pin" : data[5],
                "phone" : data[6]
              }
            let fakedata = producttosave.map((data) => {
                return { product: data.productid._id, days: data.days }
            })
            console.log("fakedata is : ",fakedata);
              const details = {
                productid: fakedata,

                rentdate: rentDate,
                paymentMethod: req.body.paymenttype,
                orderdate: new Date(),
                status: "ordered",
                address: dataObject
              };

            console.log(details);
            console.log(userDetails);
            await userdata.findOneAndUpdate({ phone: req.session.userid },{ $push: { orders: details } })
        }
        
        res.redirect('/user/orderconfirmed')
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
            producttosave = userDetails
            console.log(userDetails);
            const totalRegularPrice = data.regularprice * req.body.days
            const totalSalePrice = data.saleprice * req.body.days
            const totalDiscount = totalRegularPrice - totalSalePrice
           res.render("Users/checkout",{userAddresses,userDetails,totalRegularPrice,totalSalePrice,totalDiscount})
        }
    }
}

function addDaysToDate(inputDate) {
    const dateObject = new Date(inputDate);
    dateObject.setDate(dateObject.getDate() + 3);
  
    return dateObject;
  }
  
  function formatDate(inputDate) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return inputDate.toLocaleDateString('en-US', options);
  }