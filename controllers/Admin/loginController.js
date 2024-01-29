const admin = require('../../models/adminSchema')

module.exports = {
    get : (req,res) => {
        res.locals.title = "Login"; 
        res.render('Admin/login',{errormessage : ""})
      },
    post : async (req,res) => {
      try {
        res.locals.title = "Login"; 
        const { username, password } = req.body;
        let errormessage = ""; // Initialize errormessage outside the try block
      
        const adminCheck = await admin.findOne({ username });
      
        if (!adminCheck) {
          res.render('Admin/login', { errormessage : "invalid credintials" });
        } else {
          if (adminCheck.password === password) {
            // Passwords match, login successful
            req.session.adminlogin = "true"
            res.redirect('/admin/dashboard');
          } else {
            // Passwords do not match
            errormessage = "Invalid Credentials";
            res.render('Admin/login', { errormessage : "invalid credintials" });
          }
        }
      } catch (error) {
        console.error("Error during admin login:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
      
    },
    logout : async (req,res) => {
      delete req.session.adminlogin
      res.redirect('/admin/login')
    }
}