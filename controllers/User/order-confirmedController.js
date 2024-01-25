const usermodel = require('../../models/customerSchema')
const productmodel = require('../../models/productSchema')

module.exports = {
    get : async (req,res) => {
        userid = req.session.userid;
        user = await usermodel.findOne({phone:userid})
        allOrder = user.orders
        let selectedOrder = allOrder[allOrder.length-1]
        console.log(selectedOrder);
        const populatedArray = await Promise.all(selectedOrder.productid.map(async (product) =>{
            const singleproduct = await productmodel.findById(product.product).exec();
            return {
                product : singleproduct,
                days : product.days
            }
        }))
        selectedOrder.productid = populatedArray
        console.log(selectedOrder);
        res.render('Users/order-confirmed',{displayproduct : selectedOrder})
    },payment: async function(req,res){
        console.log('hiiii');   
     }
}