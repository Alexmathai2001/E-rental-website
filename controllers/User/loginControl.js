const fast2sms = require('fast-two-sms')
const usermodel = require("../../models/customerSchema")


module.exports = {
    get : async (req,res) => {
        res.locals.title = 'login'
        res.render("Users/login")
        
    },
    post : async (req,res) => {

        const searchphone = await usermodel.findOne({phone : req.body.phoneno})
        if(searchphone === null){
            const newuser = new usermodel({
                phone : req.body.phoneno,
                email : " ",
                name : " ",
                status : "active"
            });
            await newuser.save();
            function generateOTP() {
                // Generate a random number between 100000 and 999999
                return Math.floor(100000 + Math.random() * 900000);
            }
    
            // Generate and display the OTP
            const otp = generateOTP();
            req.session.otp = otp;
            req.session.userid = req.body.phoneno;
    
            // sending otp message via fast-two-sms
            // const newResponse = await fast2sms.sendMessage({authorization: 'GtMy04V4xy8mCnz8qHKHkqi99wBUG2G4PPxcFPw6B1gHipk2J3nuD6696D1N', message:`${otp} is your otp`, numbers: [req.body.phoneno]})
            // console.log(newResponse)
    
            res.redirect(`/user/enterotp`)
        }else if(searchphone.status == "active"){
            function generateOTP() {
                // Generate a random number between 100000 and 999999
                return Math.floor(100000 + Math.random() * 900000);
            }
    
            // Generate and display the OTP
            const otp = generateOTP();
            req.session.otp = otp;
            req.session.userid = req.body.phoneno;
    
            // sending otp message via fast-two-sms
            // const newResponse = await fast2sms.sendMessage({authorization: 'GtMy04V4xy8mCnz8qHKHkqi99wBUG2G4PPxcFPw6B1gHipk2J3nuD6696D1N', message:`${otp} is your otp`, numbers: [req.body.phoneno]})
            // console.log(newResponse)
    
            res.redirect(`/user/enterotp`)
        }else{
            console.log("blocked");
            let userblocked = "This account is currently blocked by the Admin"
            res.render("Users/login",{userblocked})
        }


    }
          
        

}