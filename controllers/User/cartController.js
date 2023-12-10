module.exports = {
    get : (req,res) => {
        res.locals.title = "My Cart"
        res.render('Users/cart')
    }
}