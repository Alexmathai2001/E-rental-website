const userinfo = require('../../models/customerSchema')

module.exports = {
    get :async (req,res) => {
        if(req.session.userid){
            res.locals.title = "My Account"
            const userdetails = await userinfo.findOne({phone : req.session.userid})
            const username = userdetails.name
            res.render("Users/my-account",{username})
        }else(
            res.redirect('/user/login')
        )

    },
    getedit :async (req,res) =>{
        const accountdetails = await userinfo.findOne({phone:req.session.userid})
        res.json(accountdetails)
    },
    postEdit : async (req,res) =>{
        console.log(req.body);
        const updateduser = await userinfo.findOneAndUpdate({phone : req.session.userid},{email:req.body.email,name: req.body.name})
        console.log("updated details :",updateduser);
        res.redirect('/user/myaccount')
    }
}