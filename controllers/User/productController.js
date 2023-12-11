module.exports = {
    get : (req,res) => {
       res.locals.title = "Product"; 
        res.render('Users/product')
      }
}