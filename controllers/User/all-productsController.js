const product = require("../../models/productSchema")

module.exports = {
    get :async (req,res) => {
        res.locals.title="Cutting Tools"
        categoryname = req.params.categoryname
        let products = await product.find({category : categoryname})
        res.render('Users/all-products',{products})
    },
    filter : async (req,res) => {
        
    }
}