module.exports = {
    get : (req,res)=>{
        res.locals.title = "customers"; 
        res.render('Admin/customers')
      }
}