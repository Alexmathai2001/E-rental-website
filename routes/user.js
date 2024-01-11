const express = require('express')
const router = express.Router()

const logincontrol = require("../controllers/User/loginControl")
const productcontroller = require("../controllers/User/productController")
const landingcontroller = require("../controllers/User/landingController")
const categorycontroller = require("../controllers/User/categoryController")
const allproductscontroller = require("../controllers/User/all-productsController")
const orderconfirmedcontroller = require("../controllers/User/order-confirmedController")
const cartcontroller = require("../controllers/User/cartController")
const checkoutcontroller = require("../controllers/User/checkoutController")
const myordercontroller = require("../controllers/User/myordersController")
const myaccountcontroller = require("../controllers/User/my-accountController")
const ordersummartcontroller = require("../controllers/User/ordersummaryController")
const addresscontroller = require("../controllers/User/addressController")
const enterotpcontroller = require("../controllers/User/enterotpController")
const newusercontroller = require("../controllers/User/newuserController")
const aboutuscontroller = require("../controllers/User/aboutusController")
const enterotpController = require('../controllers/User/enterotpController')

//login
router.get("/login",logincontrol.get)
router.post("/login",logincontrol.post)

router.get("/product/:id",productcontroller.get)
router.get("/landing",landingcontroller.get)
router.get("/categories",categorycontroller.get)

//allproducts
router.get("/allproducts/:categoryname",allproductscontroller.get)
router.post("/allproducts/filter",allproductscontroller.filter)

router.get("/orderconfirmed",orderconfirmedcontroller.get)
router.get("/cart",cartcontroller.get)
router.get("/checkout",checkoutcontroller.get)
router.get("/myorders",myordercontroller.get)
router.get("/myaccount",myaccountcontroller.get)
router.get("/ordersummary",ordersummartcontroller.get)
router.get("/address",addresscontroller.get)

//enterotp
router.get("/enterotp",enterotpcontroller.get)
router.post("/enterotp",enterotpController.post)

//newuser
router.get("/newuser",newusercontroller.get)
router.post("/newuser",newusercontroller.post)

//aboutus
router.get("/aboutus",aboutuscontroller.get)


module.exports = router