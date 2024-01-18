module.exports = {
    get : (req,res) => {
        res.locals.title = "My orders"
        res.render('Users/order-summary',{username:res.locals.username})
    }
}