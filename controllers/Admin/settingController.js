module.exports = {
    get : (req,res)=>{
        res.locals.title = "settings"; 
        res.render('Admin/settings')
      }
}