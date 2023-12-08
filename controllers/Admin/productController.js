module.exports = {
    get : (req,res) => {
        res.locals.title = "products"; 
        res.locals.variable = "Product";
        res.render('Admin/products')
    }
}