const productmodel = require('../../models/productSchema')

module.exports = {
    get :async (req,res) => {
        res.locals.title = "Category";
        let products = await productmodel.find()
        console.log(products);
        res.render('Users/categories',{products})
    }
}