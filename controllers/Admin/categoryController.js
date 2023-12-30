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
                    const newcategory = new category({
                        categoryname : req.body.categoryname,
                        showstatus : req.body.status,
                        categoryimgurl : result.secure_url,
                        cloudinaryId : result.public_id
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
        let item = await category.findById(itemId)
        res.json(item)
    },
    postDelete: async function(req,res){
        let idfordelete = req.body.deleteId
        let DeleteCategory =  await category.findByIdAndDelete(idfordelete);
        cloudinary.uploader.destroy(DeleteCategory.cloudinaryId)
        res.redirect('/admin/categories');
    },
    postSearch: async function(req,res){
        let searchKey = req.body.categorySearch;
        const categories = await category.find({categoryname : { $regex: new RegExp(searchKey, 'i') } })
        res.locals.title = "categories"; 
        res.render('Admin/categories',{categories})
    },
    postFilter : async function(req,res){
        let filerKey = req.body.filter
        console.log(filerKey);
    }

}