const categoryschema = require('../../models/categorySchema')

module.exports = {
    get : (req,res)=>{
        res.locals.title = "categories"; 
        res.locals.variable = "category";
        res.render('Admin/categories')
      },
    post : async(req,res) => {
      const status = req.body.status === 'true';

        await categoryschema.create({
          categoryname : req.body.categoryname,
          showstatus : status 
        })
    }
}