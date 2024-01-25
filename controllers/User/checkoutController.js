const { json } = require('express');
const userdata = require('../../models/customerSchema')
const products = require('../../models/productSchema')
const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: 'rzp_test_QfPZ4R4jhKFmna', key_secret: 'Kgvk8R04wASBxxMdnxR3CVZN' })

let totalSalePrice

module.exports = {
    get : async (req,res) => {
        if(req.params.id !== 'cart'){
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
                  days:req.session.days
              }
              userDetails = [data1]
              producttosave = userDetails
              const totalRegularPrice = data.regularprice * req.session.days
              totalSalePrice = data.saleprice * req.session.days
              const totalDiscount = totalRegularPrice - totalSalePrice
             res.render("Users/checkout",{userAddresses,userDetails,totalRegularPrice,totalSalePrice,totalDiscount})
             delete req.session.days
          }
        }else{
          res.locals.title = "Order Checkout"
        const address = await userdata.find({ 'address': { $exists: true, $not: { $size: 0 } } })
        console.log(address);
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
            totalSalePrice = userDetails.reduce((sum, data) => {
                return sum + (data.productid.saleprice * data.days)
            }, 0);
            const totalDiscount = totalRegularPrice - totalSalePrice
            
            res.render("Users/checkout",{userAddresses,userDetails,totalRegularPrice,totalSalePrice,totalDiscount})
        }
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
              let currentDate = new Date()
              const formattedDate = currentDate.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              });

              const formattedRentDate = newDateObject.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              });
              console.log(formattedDate);
              const details = {
                productid: fakedata,
                rentdate: formattedRentDate,
                paymentMethod: req.body.paymenttype,
                orderdate: currentDate,
                status: "confirmed",
                address: dataObject
              };
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
            req.session.days = req.body.days
            userDetails = [data1]
            producttosave = userDetails
            const totalRegularPrice = data.regularprice * req.body.days
            totalSalePrice = data.saleprice * req.body.days
            const totalDiscount = totalRegularPrice - totalSalePrice
           res.render("Users/checkout",{userAddresses,userDetails,totalRegularPrice,totalSalePrice,totalDiscount})
        }
    },payment : async function(req,res){
      console.log('payment method is '+req.body.paymentMethod);
      if(req.body.paymentMethod==='cash on delivery' ){
          res.json('Cod')
      }


          var options = {
              amount: totalSalePrice * 100,  // amount in the smallest currency unit
              currency: "INR",
              receipt: "order_rcptid_11"
            };
          instance.orders.create(options, (err, order) => { 
              if (order) { 
                  console.log(order, ": order success") 
                  res.status(200).send({ 
                      success: true, 
                      msg: "Order Created", 
                      order_id: order.id, 
                      amount: totalSalePrice * 100, 
                      key_id: 'rzp_test_QfPZ4R4jhKFmna', 
                      name: 'rafeeq', 
                      email: 'muhammedrafeeqvr@gmail.com', 
                      contact: '957983967' 
             
                  }) 
              } 
              else if (err) { 
                  console.log("Error in creating razorpay order :", err) 
                  res.status(500).send() 
              }
          })
          
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