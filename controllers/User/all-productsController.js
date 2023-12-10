module.exports = {
    get : (req,res) => {
        res.locals.title="Cutting Tools"
        res.render('Users/all-products')
    }
}