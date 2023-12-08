module.exports = {
    get : (req,res) => {
        res.locals.title = "Login"; 
        res.render('Admin/login')
      }
}