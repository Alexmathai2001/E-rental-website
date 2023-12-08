const express = require('express')
const router = express.Router()

const productcontroller = require("../controllers/Admin/productController")
const logincontroller = require("../controllers/Admin/loginController")
const ordercontroller = require("../controllers/Admin/orderController")
const customercontroller = require("../controllers/Admin/customerController")
const categorycontroller = require("../controllers/Admin/categoryController")
const settingcontroller = require("../controllers/Admin/settingController")

router.get('/login',logincontroller.get)
router.get('/products',productcontroller.get)
router.get('/customers',customercontroller.get)
router.get('/orders',ordercontroller.get)
router.get('/categories',categorycontroller.get)
router.get('/settings',settingcontroller.get)

module.exports = router