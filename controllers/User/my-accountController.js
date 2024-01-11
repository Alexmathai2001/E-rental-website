module.exports = {
    get : (req,res) => {
        if(req.session.userid){
            res.locals.title = "My Account"
            res.render("Users/my-account")
        }else(
            res.redirect('/user/login')
        )

    }
}