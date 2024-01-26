const usermodel = require("../../models/customerSchema")

module.exports = {
    get : (req , res) => {
        let phone = masked(req.session.user)
        res.render("Users/enter-otp",{phone:phone})
        let otp = req.session.otp;
        console.log(otp);
    },
    post : async (req,res) => {
        let otp = req.session.otp;
        if(req.body.enteredOtp == otp){
            delete req.session.otp;
            req.session.userid = req.session.user
            delete req.session.user
            const searchphone = await usermodel.findOne({phone : req.session.userid})
            if(!searchphone){
                const newuser = new usermodel({
                    phone : req.session.userid,
                    email : " ",
                    name : " ",
                    status : "active"
                });
                await newuser.save()
            }
            res.json({ success: true, redirectTo: req.session.url || '/user/landing' });
        }else{
            res.json({ success: false, message: 'Invalid OTP. Please try again.' });
        }
    }
}

function masked(phoneNumber) {
    const visibleDigits = 4; // Number of visible digits
    const hiddenDigits = phoneNumber.length - visibleDigits;
    const maskedNumber = '*'.repeat(hiddenDigits) + phoneNumber.slice(-visibleDigits);
    return maskedNumber;
  }