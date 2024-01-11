module.exports = {
    get : (req, res) => {
        if(req.session.userid){
            res.locals.title = "My Orders"
            res.render("Users/myorders")
        }else{
            res.redirect('/user/login')
        }

    }
}