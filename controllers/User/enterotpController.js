module.exports = {
    get : (req , res) => {
        res.render("Users/enter-otp")
        let otp = req.session.otp;
        console.log(otp);
    },
    post : async (req,res) => {
        let otp = req.session.otp;
        if(req.body.enteredOtp == otp){
            delete req.session.otp;
            req.session.userid = req.session.user
            delete req.session.user
            res.json({ success: true, redirectTo: req.session.url || '/user/landing' });
        }else{
            res.json({ success: false, message: 'Invalid OTP. Please try again.' });
        }
    }
}