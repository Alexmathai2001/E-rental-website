const prodectModel = require('../../models/productSchema');
const customerModel = require('../../models/customerSchema')

module.exports = {
    getSearch:async function(req,res){
        const searchTerm = req.query.q;
        const searchResults1 = await prodectModel.find({
            $or: [
              { productname: { $regex: new RegExp(searchTerm, 'i') } },
              { brandname:{ $regex: new RegExp(searchTerm, 'i') } },
              { category:{ $regex: new RegExp(searchTerm, 'i') } },
            ],
          })
          const searchResults = searchResults1.sort((a, b) => {
            if (a.productname.toLowerCase().includes(searchTerm.toLowerCase())) {
                return -1;
            } else if (b.productname.toLowerCase().includes(searchTerm.toLowerCase())) {
                return 1;
            }
            if (a.brandname.toLowerCase().includes(searchTerm.toLowerCase())) {
              return -1;
          } else if (b.brandname.toLowerCase().includes(searchTerm.toLowerCase())) {
              return 1;
          }
            if (a.category.toLowerCase() === searchTerm.toLowerCase()) {
                return -1;
            } else if (b.category.toLowerCase() === searchTerm.toLowerCase()) {
                return 1;
            }
        });
        console.log(searchResults);
          res.render('Users/partials/searchResult',{searchResults})
    }
}