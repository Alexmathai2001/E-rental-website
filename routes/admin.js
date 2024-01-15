const express = require('express')
const router = express.Router()


const productcontroller = require("../controllers/Admin/productController")
const logincontroller = require("../controllers/Admin/loginController")
const ordercontroller = require("../controllers/Admin/orderController")
const customercontroller = require("../controllers/Admin/customerController")
const categorycontroller = require("../controllers/Admin/categoryController")
const settingcontroller = require("../controllers/Admin/settingController")
const dashboardcontroller = require("../controllers/Admin/dashboardController")
const { route } = require('./user')

router.get('/login',logincontroller.get)

//products routes
router.get('/products',productcontroller.get)
router.post('/products',productcontroller.post)
router.post('/products/delete',productcontroller.postDelete)
router.get('/products/edit/:id',productcontroller.getEdit)
router.post('/products/edit/update',productcontroller.postEdit)
router.post('/products/search',productcontroller.postSearch)
router.post('/products/sort',productcontroller.postSort)
router.post('/products/filter',productcontroller.postFilter)

//customers
router.get('/customers',customercontroller.get)
router.get('/customers/edit/:id',customercontroller.getEdit)
router.post('/customers/update',customercontroller.postEdit)
router.post('/customers/search',customercontroller.search)
router.post('/customers/sort',customercontroller.sort)
router.post('/customers/filter',customercontroller.filter)

router.get('/orders',ordercontroller.get)

//category routes
router.get('/categories',categorycontroller.get)
router.post('/categories',categorycontroller.post)
router.get('/categories/edit/:id',categorycontroller.getEdit)
router.post('/categories/edit/update',categorycontroller.postEdit)
router.post('/categories/delete',categorycontroller.postDelete)
router.post('/categories/search',categorycontroller.postSearch)
router.post('/categories/filter',categorycontroller.postFilter)
router.post('/categories/sort',categorycontroller.postSort)

router.get('/settings',settingcontroller.get)
router.get('/dashboard',dashboardcontroller.get)

module.exports = router