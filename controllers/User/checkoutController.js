module.exports = {
    get : (req,res) => {
        res.locals.title = "Order Checkout"
        res.render("Users/checkout")
    }
}