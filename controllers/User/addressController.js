module.exports = {
    get : (req,res) => {
        res.locals.title = 'Address'
        res.render('Users/address')
    }
}