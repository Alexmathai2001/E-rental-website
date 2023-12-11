module.exports = {
    get : (req, res) => {
        res.locals.title = "Products"
        res.render('Users/product-list')
    }
}