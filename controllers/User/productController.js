const product = require ('../../models/productSchema')

module.exports = {
    get :async (req,res) => {
       res.locals.title = "Product"; 
       const productid = req.params.id;
       const displayproduct = await product.findById(productid)
      const specs = displayproduct.productspecification
      const extractedData = specs.map(item => {
        const [key, value] = item.split(':').map(str => str.trim()); // Split each item by ':' and trim spaces
        return { [key]: value }; // Return key-value pair as an object
      });
       const relatedproducts = await product.find({category : displayproduct.category})
        res.render('Users/product',{displayproduct,relatedproducts,username:res.locals.username })
      }
}