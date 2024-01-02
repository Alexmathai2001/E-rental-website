const Product = require('../../models/productSchema'); 
const category = require('../../models/categorySchema')
const cloudinary = require('../../utils/cloudinary')
const upload = require('../../utils/multer')

module.exports = {
    get: async (req, res) => {
        res.locals.title = "products"; 
        res.locals.variable = "Product";
        try {
            const products = await Product.find();
            const categories = await category.find();
            res.render('Admin/products', { products , categories });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    post: async (req, res) => {
        try {
            upload.single('productimage')(req, res, async (err) => {
                if (err) {
                    console.error('Error uploading file:', err);
                    return res.status(500).send('File upload failed');
                }
                
                try {
                    const result = await cloudinary.uploader.upload(req.file.path);
                    const count = await Product.countDocuments();
                    const nextSerialNumber = count + 1;
                    let discountamount = (req.body.discountpercentage * req.body.regularprice)/100
                    let saleamount =Math.round(req.body.regularprice - discountamount)
                    const list = req.body.specification.split(",")
                    
                    const newProduct =new Product( {
                        serialnumber: nextSerialNumber,
                        productname: req.body.productname,
                        brandname: req.body.brandname,
                        productid: `PROD-${Math.floor(10000 + Math.random() * 90000)}`,
                        category : req.body.category,
                        regularprice : req.body.regularprice,
                        saleprice : saleamount,
                        discountpercentage : req.body.discountpercentage,
                        bestseller : req.body.bestseller,
                        creationdate : Date.now(),
                        stockstatus : req.body.stockstatus,
                        productcondition : req.body.productcondition,
                        productspecification : list,
                        imageurl : result.secure_url,
                        cloudinaryid : result.public_id
                    })
                    await newProduct.save();
                    let productcount = await Product.countDocuments({category : req.body.category});
                    let updater = await category.findOneAndUpdate({categoryname:req.body.category},{ $set: { productscount: productcount } })
                    console.log(updater);
                    console.log(req.body.category);
                    console.log(productcount);
                    res.redirect('/admin/products');
                }catch (productError) {
                    console.error('Error creating/saving product:', productError);
                    res.status(500).send('Error creating/saving product');
                }
            });
        } catch (outerError) {
            console.error('Outer error in post method:', outerError);
            res.status(500).send('Internal Server Error');
        }
    },
    postDelete: async function(req,res){
        let idfordelete = req.body.deleteId
        let DeleteProduct =  await Product.findByIdAndDelete(idfordelete);
        cloudinary.uploader.destroy(DeleteProduct.cloudinaryid)
        res.redirect('/admin/products');
    },
    getEdit: async function(req,res){
        let itemId = req.params.id
        let item = await Product.findById(itemId)
        res.json(item)
    },
    postEdit : async function(req,res){
        try{
            upload.single('editproductimage')(req,res, async(err) => {
                if (err) {
                    console.error('Error uploading file:', err);
                    return res.status(500).send('File upload failed');
                }
                try{
                    let productId = req.body.editId
                    let productForEdit = await Product.findById(productId);
                    let result
                    let editdiscountamount = (req.body.editdiscountpercentage * req.body.editregularprice)/100
                    let saleamount =Math.round(req.body.editregularprice - editdiscountamount)
                    
                    if(req.file){
                        console.log(productForEdit);
                        await cloudinary.uploader.destroy(productForEdit.cloudinaryid);
                        result = await cloudinary.uploader.upload(req.file.path)
                    }
                    let reviseddata = {}
                    if(req.file){
                         reviseddata = {
                            productname : req.body.editproductname || productForEdit.productname,
                            brandname : req.body.editbrandname || productForEdit.brandname,
                            category : req.body.editcategory || productForEdit.category,
                            regularprice : req.body.editregularprice || productForEdit.regularprice,
                            discountpercentage : req.body.editdiscountpercentage || productForEdit.discountpercentage,
                            bestseller : req.body.editbestseller || productForEdit.bestseller,
                            saleprice : saleamount || productForEdit.saleamount,
                            stockstatus : req.body.editstockstatus || productForEdit.stockstatus,
                            productcondition : req.body.editproductcondition || productForEdit.productcondition,
                            productspecification : req.body.editspecification || productForEdit.productspecification,
                            imageurl : result.secure_url || productForEdit.imageurl,
                            cloudinaryId : result.public_id || productForEdit.cloudinaryId
                         }
                      }else{
                        console.log("file not found")
                        reviseddata = {
                            productname : req.body.editproductname || productForEdit.productname,
                            brandname : req.body.editbrandname || productForEdit.brandname,
                            category : req.body.editcategory || productForEdit.category,
                            regularprice : req.body.editregularprice || productForEdit.regularprice,
                            discountpercentage : req.body.editdiscountpercentage || productForEdit.discountpercentage,
                            bestseller : req.body.editbestseller || productForEdit.bestseller,
                            saleprice : saleamount || productForEdit.saleamount,
                            stockstatus : req.body.editstockstatus || productForEdit.stockstatus,
                            productcondition : req.body.editproductcondition || productForEdit.productcondition,
                            productspecification : req.body.editspecification || productForEdit.productspecification

                        }
                      }
                    await Product.findByIdAndUpdate(productId, reviseddata);
                    res.redirect('/admin/products');


                }catch (productError) {
                    console.error('Error creating/saving product:', productError);
                    res.status(500).send('Error creating/saving product');
                }
            });
        }catch (outerError) {
            console.error('Outer error in post method:', outerError);
            res.status(500).send('Internal Server Error');
        }
    },
    postSearch: async function(req,res){
        let searchkey = req.body.productSearch        
        const products = await Product.find({productname : { $regex: new RegExp(searchkey, 'i') } })
        const categories = await category.find();
        res.locals.title = "products"; 
        res.render('Admin/products',{ products , categories })

    }
}
