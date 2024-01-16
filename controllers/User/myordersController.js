module.exports = {
    get : (req, res) => {
        if(req.session.userid){
            res.locals.title = "My Orders"
            if(req.session.url){
                delete req.session.url
            }
            res.render("Users/myorders")
        }else{
            req.session.url = "/user/myorders"
            res.redirect('/user/login')
        }

    }
}