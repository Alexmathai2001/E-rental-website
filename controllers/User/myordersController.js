const usermodel = require('../../models/customerSchema')
const productmodel = require('../../models/productSchema')

module.exports = {
    get : async (req, res) => {
        if(req.session.userid){
            res.locals.title = "My Orders"
            if(req.session.url){
                delete req.session.url
            }
            const customer = await usermodel.findOne({phone : req.session.userid})
            const orders = customer.orders
            let populatedOrders = await Promise.all(orders.map(async (order) => {
                const populatedProducts = await Promise.all(order.productid.map(async (product) => {
                    const populatedProduct = await productmodel.findById(product.product).exec()
                    return {
                        ...product.toObject(),
                        product: populatedProduct
                    }
                }))
                order.productid = populatedProducts;
                return order;
            }))

            populatedOrders = populatedOrders.reverse()
            res.render("Users/myorders",{username:res.locals.username , populatedOrders})
        }else{
            req.session.url = "/user/myorders"
            res.redirect('/user/login')
        }

    }
}