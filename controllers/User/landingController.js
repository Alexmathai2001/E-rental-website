const category = require("../../models/categorySchema")
const product = require("../../models/productSchema")


module.exports = {
    get : async (req,res) => {
      const categories = await category.find()
      const products = await product.find()
        res.render('Users/landing',{categories,products})
      }
}