const Customer = require('../../models/customerSchema');
const Product = require('../../models/productSchema');

module.exports = {
    get: async (req, res) => {
        res.locals.title = "Dashboard";
        try {
            res.locals.title = "orders";
            const allUserOrders = await Customer.find({}, 'orders');
            const transformedOrders = await Promise.all(
                allUserOrders.map(async (userOrder) => {
                    const userId = userOrder._id;
                    const user = await Customer.findById(userId, 'phone');
                    const processedOrders = await Promise.all(
                        userOrder.orders.map(async (order) => {
                            const productDetails = await Promise.all(
                                order.productid.map(async (product) => {
                                    const productId = product.product;
                                    const productInfo = await Product.findById(productId);
                                    const totalPricePerProduct = productInfo.saleprice * product.days;
                                    return {
                                        productId: productId,
                                        ProductName: product.productname,
                                        price: totalPricePerProduct,
                                    };
                                })
                            );
                            const totalOrderPrice = productDetails.reduce((total, product) => total + product.price, 0);
                            const orderDetails = {
                                orderId: order._id,
                                userId: userId,
                                address: order.address,
                                phone: user.phone,
                                date: order.orderdate.toLocaleString(),
                                status: order.status,
                                products: productDetails,
                                totalOrderPrice: totalOrderPrice,
                            };
                            return orderDetails;
                        })
                    );
                    return processedOrders.flat();
                })
            );
            const globalOrders = transformedOrders.flat().reverse();
            const customers = await Customer.find();
            const products = await Product.find();
            const totalOrderPriceSum = globalOrders.reduce((sum, order) => sum + order.totalOrderPrice, 0);
            res.render('Admin/dashboard', { orders: globalOrders.length, customers: customers.length, totalOrderPriceSum, products: products.length });
        } catch (error) {
            console.error(error);
            // Handle the error, send an appropriate response, or log it.
        }
    },
};
