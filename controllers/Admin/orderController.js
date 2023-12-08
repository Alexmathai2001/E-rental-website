module.exports = {
    get : (req,res)=>{
        res.locals.title = "orders"; 
        res.render('Admin/orders')
      }
}