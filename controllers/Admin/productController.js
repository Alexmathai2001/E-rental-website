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
                        imageurl : result.secure_url,
                        cloudinaryid : result.public_id
                    })
                    await newProduct.save();
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
        cloudinary.uploader.destroy(DeleteProduct.cloudinaryId)
        res.redirect('/admin/products');
    }
}
