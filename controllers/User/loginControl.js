module.exports = {
    get : (req,res) => {
        res.locals.title = 'login'
        res.render("Users/login")
    }
}