const usermodel = require('../../models/customerSchema')
let params
module.exports = {
    get : (req,res) => {
        res.locals.title = 'Address'
        params = req.params.id
        res.render(`Users/address`,{username:res.locals.username})
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

         const addedaddress = await usermodel.findOneAndUpdate(
            { phone: req.session.userid },
            { $push: { address: newAddress } },
            { new: true } // To return the updated document
          )
         
          res.redirect(`/User/checkout/${params}`)

    },
    getedit : async (req,res) => {
        let user = await usermodel.findOne({phone : req.session.userid})
        let addresses = user.address.filter(addr => addr._id == req.params.id)
        let address = addresses.length > 0 ? addresses[0] : null ;
        res.render('Users/address',{username:res.locals.username,address})
    },
    postedit : async(req,res) => {
        let address = await usermodel.findOneAndUpdate(
            { phone: req.session.userid, 'address._id': req.params.id },
            {
              $set: {
                'address.$.name': req.body.FullName,
                'address.$.phone': req.body.ContactNumber,
                'address.$.houseno': req.body.HouseNo,
                'address.$.roadname': req.body.RoadName,
                'address.$.city': req.body.city,
                'address.$.pin': req.body.pin,
                'address.$.state': req.body.state
              }
            },
            { new: true }
          );
        res.redirect('/user/checkout')
    }
}