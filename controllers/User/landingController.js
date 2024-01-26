const category = require("../../models/categorySchema")
const product = require("../../models/productSchema")
const userModel = require("../../models/customerSchema")


module.exports = {
    get : async (req,res) => {
      const categories = await category.find({showstatus : "Listed"})
      const products = await product.find()
      res.render('Users/landing',{categories,products,username:res.locals.username})

      }
}