module.exports = {
    get : (req,res) => {
        res.locals.title = "My Account"
        res.render("Users/my-account")
    }
}