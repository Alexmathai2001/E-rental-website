const category = require('../../models/categorySchema')
const cloudinary = require('../../utils/cloudinary')
const upload = require('../../utils/multer')

module.exports = {
    get :async (req,res)=>{
        res.locals.title = "categories"; 
        res.locals.variable = "category";
        const categories = await category.find();
        res.render('Admin/categories',{categories})
      },
    post: async (req, res) => {
        try {
            upload.single('categoryimage')(req, res, async (err) => {
                if (err) {
                    console.error('Error uploading file:', err);
                    return res.status(500).send('File upload failed');
                }
                
                try {
                    const result = await cloudinary.uploader.upload(req.file.path);
                    console.log(result);
                    
                    const newcategory = new category({
                        categoryname : req.body.categoryname,
                        showstatus : req.body.status,
                        categoryimgurl : result.secure_url
                    });
                    
                    await newcategory.save();
                    
                    res.redirect('/admin/categories');
                } catch (productError) {
                    console.error('Error creating/saving product:', productError);
                    res.status(500).send('Error creating/saving product');
                }
            });
        } catch (outerError) {
            console.error('Outer error in post method:', outerError);
            res.status(500).send('Internal Server Error');
        }
    },
    getEdit: async function(req,res){
        let itemId = req.params.id.trim()
        console.log(itemId);
         let item = await category.findById(itemId)
         res.json({item})
       },
}