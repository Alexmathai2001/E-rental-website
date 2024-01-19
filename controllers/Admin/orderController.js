const usermodel = require('../../models/customerSchema')
const productmodel = require('../../models/productSchema');


module.exports = {
    get : async (req,res)=>{
      try {
        res.locals.title = "orders";
        const allusersOrder =  await usermodel.find({},"orders")
        const individualisedOrder = await Promise.all(
          allusersOrder.map(async (userOrder) => {
            const userid = userOrder._id;
            const user = await usermodel.findById(userid,"phone")
            const processedOrders = await Promise.all(
              userOrder.productid.map(async (product) => {
                const productId = product.product;
                const productinfo = await productmodel.findById(productId)

                const totalamount = productinfo.regularprice * product.days
              })
            )

          })
        )
        res.render('Admin/orders')
        
      } catch (error) {
        
      }
      }
}