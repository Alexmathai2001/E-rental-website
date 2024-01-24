const Customer = require('../../models/customerSchema')
const Product = require('../../models/productSchema');

let orderId
let userId
let globalOrders

module.exports = {
    get : async (req,res)=>{
      try {
        res.locals.title = "orders";
        const allUserOrders = await Customer.find({},'orders');
        const transformedOrders = await Promise.all(
          allUserOrders.map(async (userOrder) => {
            const userId = userOrder._id;
            const user = await Customer.findById(userId, 'phone')
            const ProcessedOrders = await Promise.all(
              userOrder.orders.map(async (order) => {
                const productDetails = await Promise.all(
                  order.productid.map(async (product) => {
                    const productId = product.product;
                    const productInfo = await Product.findById(productId)
                    const totalPricePerProduct = productInfo.saleprice * product.days
                    return {
                      productId : productId,
                      ProductName : product.productname,
                      price : totalPricePerProduct
                    }
                  })
                )
                const totalOrderPrice = productDetails.reduce((total,product) => total + product.price,0)
                const orderDetails = {
                  orderId : order._id,
                  userId : userId,
                  address : order.address,
                  phone : user.phone,
                  date : order.orderdate.toLocaleString(),
                  status : order.status,
                  products: productDetails,
                  totalOrderPrice : totalOrderPrice
                }
                return orderDetails
              })
            )
            return ProcessedOrders.flat()
          })
        )
          globalOrders = []
          let orders = transformedOrders.flat().reverse()
          console.log(orders);
          globalOrders=orders
        res.render('Admin/orders',{orders})
        
      } catch (error) {
        
      }
      },
      getedit : async (req,res) => {
        const bothId = req.params.id;
        let splitedId = bothId.split("-")
        userId = splitedId[0]
        orderId = splitedId[1]

        const customer = await Customer.findById(userId)
        let order = customer.orders.find(order => order._id.toString() === orderId)
        const populatedProducts = await Promise.all(order.productid.map(async (product) => {
          const populatedProduct = await Product.findById(product.product).exec()
          return {
            ...product.toObject(),
            product : populatedProduct
          }
        }))
        order.productid = populatedProducts
        console.log(order.productid);
        res.json({order:order,userId,orderId})
        
      },
      postEdit : async (req,res) => {
        console.log(req.body);
        console.log("orderid : ",orderId,"userid : ",userId);
        let statusUpdate = await Customer.findByIdAndUpdate(
          userId,
          {
            $set: {
              'orders.$[order].status': req.body.status
            }
          },
          { new: true, arrayFilters: [{ 'order._id': orderId }] }
        );
        res.redirect('/admin/orders');
      },
      search : async (req,res) =>{
        try {
          let searchValue = req.body.searchValue.toLowerCase(); 
  
          const addressKeys = ['name', 'houseno', 'roadname', 'city', 'state'];
  
  
          const filteredOrders = globalOrders.filter(order => {
              const orderAddress = order.address;
  
              const addressMatch = addressKeys.some(key => orderAddress[key].toString().toLowerCase().includes(searchValue));
  
  
              const phoneMatch = order.phone.toString().toLowerCase().includes(searchValue);
  
              // Check if any other property in the order contains the searchValue
              const otherPropertyMatch = Object.values(order)
                  .some(value => value && typeof value === 'string' && value.toLowerCase().includes(searchValue));
  
              return addressMatch || phoneMatch || otherPropertyMatch;
          });
  
          res.render('Admin/partials/orders-table', { orders: filteredOrders });
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
    },
    postSort : async function(req,res){
        const sortStatus =req.body.sort
        if(sortStatus=="Newest first"){
          let orders =  globalOrders.sort(sortArraydate)
          res.render('Admin/partials/orders-table', { orders: orders });
        }
        if(sortStatus=="Oldest First"){
          let orders =  globalOrders.sort(sortArraydate2)
          res.render('Admin/partials/orders-table', { orders: orders });
        } if(sortStatus=="Ascending"){
            let orders =  globalOrders.sort(sortArrayPrice)
            res.render('Admin/partials/orders-table', { orders: orders });
        } if(sortStatus=="Descending"){
            let orders =  globalOrders.sort(sortArrayPrice2)
            res.render('Admin/partials/orders-table', { orders: orders });
        }
    },
    postFilter : async function(req,res){
    
        const filterStatus = req.body.filterValue.toLowerCase();
    
        const filteredOrders = globalOrders.filter(order => {
            const statusMatch = order.status.toString().toLowerCase() === filterStatus;
            return statusMatch;
        });
        res.render('Admin/partials/orders-table', { orders: filteredOrders });
    }
}

function sortArraydate(a,b){
  if(a.date < b.date){
    return 1
  }
  if(a.date > b.date){
    return -1
  }
  return 0;
}
function sortArraydate2(a,b){
  if(a.date < b.date){
    return -1
  }
  if(a.date > b.date){
    return 1
  }
  return 0;
}
function sortArrayPrice(a,b){
  if(a.totalOrderPrice < b.totalOrderPrice){
    return -1
  }
  if(a.totalOrderPrice > b.totalOrderPrice){
    return 1
  }
  return 0;
}
function sortArrayPrice2(a,b){
  if(a.totalOrderPrice < b.totalOrderPrice){
    return 1
  }
  if(a.totalOrderPrice > b.totalOrderPrice){
    return -1
  }
  return 0;
}
