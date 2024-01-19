const usermodel = require('../../models/customerSchema')

module.exports = {
    get :async (req,res) => {
            try {
                if(req.session.url){
                    delete req.session.url;
                }
                // Fetch customer details and populate the cart array with product details
                const userDetails = await usermodel.findOne({ phone: req.session.userid })
                    .populate('cart.productid'); // Populate the cart array with product details
                const CartArray = userDetails.cart.reverse();
                const totalRegularPrice = CartArray.reduce((sum, data) => {
                    // Multiply the regular price by the number of days for each product
                    return sum + (data.productid.regularprice * data.days);
                  }, 0);
                const totalSalePrice = CartArray.reduce((sum, data) => {
                    return sum + (data.productid.saleprice * data.days)
                }, 0);
                const totalDiscount = totalRegularPrice - totalSalePrice
                res.render('Users/cart', { CartArray,totalRegularPrice,totalSalePrice,totalDiscount,username:res.locals.username });
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        },
    post :async (req,res) => {
        console.log(req.session);
        if(req.session.userid){
            //to find if the cart product is already existing or is a new product
            const data = await usermodel.findOne({
                phone: req.session.userid,
                'cart.productid': req.body.product
              });
 
            let productId = req.body.productId || req.body.product
            let days = req.body.days || 2
            if(req.body.productId || !data){
                const updatedCart = await usermodel.findOneAndUpdate({phone:req.session.userid}, 
                    { $push: { cart: { productid: productId, days: days } } },
                    { new: true } // Return the updated document
                );
                res.redirect('/user/landing')
            }else if(req.body.product){
                const updatedCart = await usermodel.findOneAndUpdate(
                    {
                      phone: req.session.userid,
                      'cart.productid': productId // Find by phone and productid
                    },
                    {
                      $set: { 'cart.$.days': days } // Update the days field of the matching productid
                    },
                    {
                      new: true // Return the updated document
                    }
                  );
                  res.redirect('/user/cart')
            }

        }else{
            res.redirect('/user/login')
        }
    },
    removecart : async (req,res) => {
        const updatedCart = await usermodel.findOneAndUpdate(
            { phone : req.session.userid },
            { $pull: { 'cart': { productid: req.body.productid },'cart.days': req.body.days  } },  // Remove product from cart array
            { new: true }  // Return the updated document
          );
        res.redirect('/user/cart')
    }
}