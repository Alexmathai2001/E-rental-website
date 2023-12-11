module.exports = {
    get : (req, res) => {
        res.locals.title = "My Orders"
        res.render("Users/myorders")
    }
}