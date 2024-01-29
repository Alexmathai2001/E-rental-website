const express = require('express')
const router = express.Router()
const loginAuth = require('../middleware/loginAuth')


const productcontroller = require("../controllers/Admin/productController")
const logincontroller = require("../controllers/Admin/loginController")
const ordercontroller = require("../controllers/Admin/orderController")
const customercontroller = require("../controllers/Admin/customerController")
const categorycontroller = require("../controllers/Admin/categoryController")
const settingcontroller = require("../controllers/Admin/settingController")
const dashboardcontroller = require("../controllers/Admin/dashboardController")
const { route } = require('./user')

//login
router.get('/login',logincontroller.get)
router.post('/login',logincontroller.post)

//logout
router.get('/logout',logincontroller.logout)

//products routes
router.get("/products",loginAuth.adminAuth,productcontroller.get)
router.post('/products',productcontroller.post)
router.post('/products/delete',productcontroller.postDelete)
router.get('/products/edit/:id',productcontroller.getEdit)
router.post('/products/edit/update',productcontroller.postEdit)
router.post('/products/search',productcontroller.postSearch)
router.post('/products/sort',productcontroller.postSort)
router.post('/products/filter',productcontroller.postFilter)

//customers
router.get('/customers',loginAuth.adminAuth,customercontroller.get)
router.get('/customers/edit/:id',customercontroller.getEdit)
router.post('/customers/update',customercontroller.postEdit)
router.post('/customers/search',customercontroller.search)
router.post('/customers/sort',customercontroller.sort)
router.post('/customers/filter',customercontroller.filter)


//orders
router.get('/orders',loginAuth.adminAuth,ordercontroller.get)
router.get('/orders/:id',ordercontroller.getedit)
router.post('/orders/updateorder',ordercontroller.postEdit)
router.post('/orders/search',ordercontroller.search)
router.post('/orders/sort',ordercontroller.postSort)
router.post('/orders/filter',ordercontroller.postFilter)

//category routes
router.get('/categories',loginAuth.adminAuth,categorycontroller.get)
router.post('/categories',categorycontroller.post)
router.get('/categories/edit/:id',categorycontroller.getEdit)
router.post('/categories/edit/update',categorycontroller.postEdit)
router.post('/categories/delete',categorycontroller.postDelete)
router.post('/categories/search',categorycontroller.postSearch)
router.post('/categories/filter',categorycontroller.postFilter)
router.post('/categories/sort',categorycontroller.postSort)

router.get('/settings',loginAuth.adminAuth,settingcontroller.get)
router.get('/dashboard',loginAuth.adminAuth,dashboardcontroller.get)

module.exports = router