const productModel = require('../../models/productSchema')
const customerModel = require('../../models/customerSchema')

module.exports = {
    get : async (req,res) => {
        res.locals.title = "My orders"
        let combinedid = req.params.id
        splitid = combinedid.split("-")
        orderid = splitid[0]
        productid = splitid[1]
        const user = await customerModel.findOne({phone : req.session.userid})
        let allorders = user.orders
        selectedorder = allorders.find(order => order._id.toString() === orderid)
        let selectedproductindex = selectedorder.productid.findIndex(product => product._id.toString() === productid)
        const selectedproductdetails = selectedorder.productid[selectedproductindex]
        const populatedproduct = await productModel.findById(selectedproductdetails.product).exec()
        selectedorder.productid = [{
            product: populatedproduct,
            days : selectedproductdetails.days
        }]
        const product = selectedorder.productid[0].product
        const order = selectedorder
        console.log("order",selectedorder);
        console.log("product",selectedorder.productid[0].product);

        res.render('Users/order-summary',{username:res.locals.username,product,order})
    }
}