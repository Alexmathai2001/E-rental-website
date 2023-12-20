const productSchema = require('../../models/productSchema');
const productschema = require('../../models/productSchema')

module.exports = {
    get : async(req,res) => {
        res.locals.title = "products"; 
        res.locals.variable = "Product";
        let product = await productschema.find()
        res.render('Admin/products',{product})
        
    },
    post : async (req,res) => {

        const count = await productschema.countDocuments()
        const nextserialnumber = count + 1
        
        prodid = `PROD-${Math.floor(10000 + Math.random() * 900000)}`;
        

        await productschema.create({
            serialnumber : nextserialnumber,
            productname : req.body.productname,
            productid : prodid,
            brandname : req.body.brandname,
            category : req.body.category,
            regularprice : req.body.regularprice,
            discountpercentage : req.body.discount,
            bestseller : req.body.bestseller,
            creationdate : req.body.creationdate,
            stockstatus : req.body.stockstatus,
            productcondition : req.body.productcondition 
        })
        res.locals.title = "products"; 
        res.locals.variable = "Product";
        let product = await productschema.find()
        res.redirect('/admin/products')
    }
}