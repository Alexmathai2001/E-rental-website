const userModel = require('../models/customerSchema')

function userAuth(req, res, next) {
  if (req.session && req.session.userid) {
      return res.redirect('/user/landing');
  }
  next();
}

async function JustLoginCheck(req,res,next){
  if(req.session.userid){
    const userDetails = await  userModel.findOne({phone : req.session.userid})
    const username = userDetails.name
    res.locals.username = username
  }
  next();
}

async function userlogincheck(req,res,next){
  if(req.session.userid){
    const userDetails = await  userModel.findOne({phone : req.session.userid})
    const username = userDetails.name
    res.locals.username = username
  }else{
    req.session.url = req.originalUrl;
    return res.redirect('/user/login')
  }
  next()
}  


  module.exports = {userAuth,userlogincheck,JustLoginCheck};
