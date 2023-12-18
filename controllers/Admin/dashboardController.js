module.exports = {
    get : (req,res) => {
        res.locals.title = "Dashboard"
        res.render('Admin/dashboard')
    }
}