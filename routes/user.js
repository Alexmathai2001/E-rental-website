const express = require('express')
const router = express.Router()

const logincontroller = require("../controllers/User/loginController")
const productcontroller = require("../controllers/User/productController")
const landingcontroller = require("../controllers/User/landingController")
const categorycontroller = require("../controllers/User/categoryController")
const allproductscontroller = require("../controllers/User/all-productsController")
const orderconfirmedcontroller = require("../controllers/User/order-confirmedController")
const cartcontroller = require("../controllers/User/cartController")
const checkoutcontroller = require("../controllers/User/checkoutController")
const myordercontroller = require("../controllers/User/myordersController")
const myaccountcontroller = require("../controllers/User/my-accountController")
const productlistcontroller = require('../controllers/User/product-listController')

router.get("/",logincontroller.get)
router.get("/product",productcontroller.get)
router.get("/landing",landingcontroller.get)
router.get("/categories",categorycontroller.get)
router.get("/allproducts",allproductscontroller.get)
router.get("/orderconfirmed",orderconfirmedcontroller.get)
router.get("/cart",cartcontroller.get)
router.get("/checkout",checkoutcontroller.get)
router.get("/myorders",myordercontroller.get)
router.get("/myaccount",myaccountcontroller.get)
router.get("/products",productlistcontroller.get)

module.exports = router