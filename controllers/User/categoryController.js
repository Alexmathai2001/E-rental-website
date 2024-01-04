const category = require('../../models/categorySchema')

module.exports = {
    get :async (req,res) => {
        res.locals.title = "Category";
        let categories = await category.find()
        console.log(categories);
        res.render('Users/categories',{categories})
    }
}