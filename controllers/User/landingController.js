const category = require("../../models/categorySchema")
const product = require("../../models/productSchema")
const userModel = require("../../models/customerSchema")


module.exports = {
    get : async (req,res) => {
      const categories = await category.find({showstatus : "Listed"})
      const products = await product.find()

      if(req.session.userid){
        const userDetails = await  userModel.findOne({phone : req.session.userid})
        const username = userDetails.name
        res.locals.username = username
      }
      res.render('Users/landing',{categories,products,username:res.locals.username})

      }
}