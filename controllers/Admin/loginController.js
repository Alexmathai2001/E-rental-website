const admin = require('../../models/adminSchema')

module.exports = {
    get : (req,res) => {
        res.locals.title = "Login"; 
        res.render('Admin/login')
      },
    post : async (req,res) => {
      console.log(req.body);
      const admincheck = await admin.find({username : req.body.username})
      console.log("admin check",admincheck);
      if(admincheck == null ){
        console.log("admin not found");
      }else{
        console.log("admin found");
      }
    }
}