

function userAuth(req, res, next) {
  if (req.session && req.session.userid) {
      return res.redirect('/user/landing');
  }
  next();
}


function userlogincheck(req,res,next){
  if(!req.session.userid){
    return res.redirect('/user/login')
  }
  next()
}  


  module.exports = {userAuth,userlogincheck};