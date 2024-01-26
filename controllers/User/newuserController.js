const customerschema = require('../../models/customerSchema')

module.exports = {
    get : (req , res) => {
        res.render("Users/new-user")
    },
    post : async (req,res) => {
        await customerschema.create({
            name : req.body.fullname,
            phone : req.body.phone,
            email : req.body.email,
            gender : req.body.gender
        })
        
    }
}