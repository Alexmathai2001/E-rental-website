module.exports = {
    get : (req,res) => {
        res.locals.title = "Category";
        res.render('Users/categories')
    }
}