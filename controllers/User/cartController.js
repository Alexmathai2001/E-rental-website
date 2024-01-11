const usermodel = require('../../models/customerSchema')

module.exports = {
    get :async (req,res) => {
        if (req.session.userid) {
            try {
                res.locals.title = "My Cart";
    
                // Fetch customer details and populate the cart array with product details
                const userDetails = await usermodel.findOne({ phone: req.session.userid })
                    .populate('cart.productid'); // Populate the cart array with product details
                const CartArray = userDetails.cart;
    
                console.log(CartArray);
                const totalRegularPrice = CartArray.reduce((sum, data) => sum + data.productid.regularprice, 0);
                const totalSalePrice = CartArray.reduce((sum, data) => sum + data.productid.saleprice, 0);
                const totalDiscount = totalRegularPrice - totalSalePrice
                console.log(totalRegularPrice);
                res.render('Users/cart', { CartArray,totalRegularPrice,totalSalePrice,totalDiscount });
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        } else {
            // If user is not authenticated, redirect to login page
            res.redirect('/user/login');
        }
        },
    post :async (req,res) => {
        if(req.session.userid){
            let productId = req.body.productId
            let quantity = 1
            const updatedCart = await usermodel.findOneAndUpdate({phone:req.session.userid}, 
                { $push: { cart: { productid: productId, quantity: quantity } } },
                { new: true } // Return the updated document
            );
            console.log(updatedCart);

        }else{
            res.redirect('/user/login')
        }
    }
}