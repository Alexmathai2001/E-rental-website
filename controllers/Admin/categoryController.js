module.exports = {
    get : (req,res)=>{
        res.locals.title = "categories"; 
        res.locals.variable = "category";
        res.render('Admin/categories')
      }
}