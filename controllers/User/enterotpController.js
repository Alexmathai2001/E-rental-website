module.exports = {
    get : (req , res) => {
        res.render("Users/enter-otp")
        let otp = req.session.otp;
        console.log(otp);
    },
    post : async (req,res) => {
        console.log(req.body);
        console.log("user entered otp is",req.body.enteredOtp);
        let otp = req.session.otp;
        console.log("actual otp is" , otp);
        if(req.body.enteredOtp == otp){
            console.log("if condition");
            // res.json({ success: true});
            res.json({ success: true, redirectTo: '/user/landing' });
        }else{
            console.log("else condition");
            res.json({ success: false, message: 'Invalid OTP. Please try again.' });
        }
    }
}