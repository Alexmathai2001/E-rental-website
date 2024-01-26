const category = require('../../models/categorySchema')

module.exports = {
    get :async (req,res) => {
        res.locals.title = "Category";
        let categories = await category.find()
        res.render('Users/categories',{categories,username:res.locals.username})
    }
}