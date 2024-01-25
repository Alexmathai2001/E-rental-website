const prodectModel = require('../../models/productSchema');
const customerModel = require('../../models/customerSchema')

module.exports = {
    get :async (req,res) => {
        res.locals.title="Cutting Tools"
        categoryname = req.params.categoryname
        let products = await prodectModel.find({category : categoryname})
        res.render('Users/all-products',{products,username:res.locals.username})
    },
    filter : async (req,res) => {
        console.log(req.body);
        const { price, condition, discount } = req.body;

        const query = {};

        if (price) {
            if (Array.isArray(price) && price.length > 0) {
                query.$or = price.map(data => {
                    const [minPrice, maxPrice] = data.split('-');
                    return { saleprice: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) } };
                });
            } else {
                const [minPrice, maxPrice] = price.split('-');
                query.saleprice = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
            }
        }
        if (condition) {
            query.productcondition = condition;
        }
        if (discount) {
            if (Array.isArray(discount) && discount.length > 0) {
                query.$or = discount.map(data => {
                    return { discountpercentage: { $gte: parseInt(data) } };
                });
            } else {
                query.discountpercentage = { $gte: parseInt(discount) };
            }
        }
        console.log(query);
        try {
            const searchResults = await prodectModel.find({ category : categoryname, ...query });
            console.log("search result",searchResults);
            res.render('Users/partials/searchResult',{searchResults})
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }
}