const customers = require('../../models/customerSchema')

module.exports = {
    get : async (req,res)=>{
        res.locals.title = "customers"; 
        const data = await customers.find()
        const customerDetails = data.reverse()
        res.render('Admin/customers',{customerDetails})
      },
    getEdit : async(req,res) => {
      let itemId = req.params.id
      const accountdetails = await customers.findById(itemId)
      res.json(accountdetails)
    },
    postEdit : async(req,res) => {
      console.log("body content : ",req.body);
      const updateduser = await customers.findOneAndUpdate({phone : req.body.phone},{email:req.body.email,name: req.body.name,status:req.body.status})
      console.log("updated details :",updateduser);
      res.redirect('/admin/customers')
    }
}