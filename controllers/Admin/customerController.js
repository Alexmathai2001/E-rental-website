const customers = require('../../models/customerSchema')

module.exports = {
    get : async (req,res)=>{
        res.locals.title = "customers"; 
        const data = await customers.find()
        const customerDetails = data.reverse()
        console.log(customerDetails);
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
    },
    search : async (req,res) =>{
      try {
        const searchValue = req.body.searchValue;
        const isNumeric = !isNaN(searchValue);
           let query;
           if (isNumeric) {
               query = {
                   $or: [
                       { name: { $regex: new RegExp(searchValue, 'i') } },
                       { email: { $regex: new RegExp(searchValue, 'i') } },
                       { phone: searchValue } 
                   ]
               };
           } else {
               query = {
                   $or: [
                       { name: { $regex: new RegExp(searchValue, 'i') } },
                       { email: { $regex: new RegExp(searchValue, 'i') } }
                   ]
               };
           }
        const customer = await customers.find(query);
            res.render('Admin/partials/customer-table', { customerDetails: customer });
    }catch (error) {
        console.error('Error in postSearch:', error);
        res.status(500).send('Internal Server Error');
    }
  },
  sort: async (req,res) => {
    const sortStatus =req.body.sort
    let  customersinDb = await customers.find()
    if(sortStatus=="z-a"){
     let customers =  customersinDb.sort(sortArrayZtoA)
     res.render('Admin/partials/customer-table', { customerDetails: customers });
    }
    if(sortStatus=="a-z"){
        let customers =  customersinDb.sort(sortArrayAtoZ)
        res.render('Admin/partials/customer-table', { customerDetails: customers });
    }
    if(sortStatus=="Newest first"){
        let customers =  customersinDb.reverse()
        res.render('Admin/partials/customer-table', { customerDetails: customers });
    }
    if(sortStatus=="Oldest First"){
        let customers =  customersinDb
        res.render('Admin/partials/customer-table', { customerDetails: customers });
    } if(sortStatus=="Ascending"){
      
    } if(sortStatus=="Descending"){
      
    }
  },
  filter: async (req,res) => {
    const filterStatus =req.body.filterValue;

    if(filterStatus =='All'){
    let customersData = await customers.find()
    let customer = customersData.reverse()
    res.render('Admin/partials/customer-table', { customerDetails: customer });
    }else{
        let customer = await customers.find({status:filterStatus});
        res.render('Admin/partials/customer-table', { customerDetails: customer });
      }
}


  
}

function sortArrayZtoA(a,b){
  if(a.name < b.name){
    return 1
  }
  if(a.name > b.name){
    return -1
  }
  return 0;
}
function sortArrayAtoZ(a,b){
  if(a.name < b.name){
    return-1
  }
  if(a.name > b.name){
    return 1
  }
  return 0;
}