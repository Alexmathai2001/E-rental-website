const user = require('../../models/customerSchema')

module.exports = {
    get : (req,res) => {
        res.locals.title = 'Address'
        res.render('Users/address',{username:res.locals.username})
    },
    post : async (req,res) => {
        const newAddress = {
            name: req.body.FullName,
            houseno: req.body.HouseNo,
            roadname: req.body.RoadName,
            city: req.body.city,
            state: req.body.state,
            pin: req.body.pin,
            phone: req.body.ContactNumber
          };

         const addedaddress = await user.findOneAndUpdate(
            { phone: req.session.userid },
            { $push: { address: newAddress } },
            { new: true } // To return the updated document
          )
          res.redirect('/user/checkout')

    }
}