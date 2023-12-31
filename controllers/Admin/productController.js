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
                    // console.log(result);
                    
                    const count = await Product.countDocuments();
                    const nextSerialNumber = count + 1;
                    let discountamount = (req.body.discount * req.body.regularprice)/100
                    let saleamount = (req.body.regularprice - discountamount)
                    console.log(saleamount)
                    
                    const newProduct =new Product( {
                        serialnumber: nextSerialNumber,
                        productname: req.body.productname,
                        brandname: req.body.brandname,
                        productid: `PROD-${Math.floor(10000 + Math.random() * 900000)}`,
                        category : req.body.category,
                        regularprice : req.body.regularprice,
                        saleprice : Math.round(saleamount),
                        discountpercentage : req.body.discount,
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
    }
}
