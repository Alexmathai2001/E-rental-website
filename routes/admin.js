const express = require('express')
const router = express.Router()


const productcontroller = require("../controllers/Admin/productController")
const logincontroller = require("../controllers/Admin/loginController")
const ordercontroller = require("../controllers/Admin/orderController")
const customercontroller = require("../controllers/Admin/customerController")
const categorycontroller = require("../controllers/Admin/categoryController")
const settingcontroller = require("../controllers/Admin/settingController")
const dashboardcontroller = require("../controllers/Admin/dashboardController")

router.get('/login',logincontroller.get)

router.get('/products',productcontroller.get)
router.post('/products',productcontroller.post)

router.get('/customers',customercontroller.get)
router.get('/orders',ordercontroller.get)

//category routes
router.get('/categories',categorycontroller.get)
router.post('/categories',categorycontroller.post)
router.get('/categories/edit/:id',categorycontroller.getEdit)
router.post('/categories/edit/update',categorycontroller.postEdit)
router.post('/categories/delete',categorycontroller.postDelete)
router.post('/categories/search',categorycontroller.postSearch)
router.post('/categories/filter',categorycontroller.postFilter)

router.get('/settings',settingcontroller.get)
router.get('/dashboard',dashboardcontroller.get)

module.exports = router