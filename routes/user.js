const express = require('express')
const router = express.Router()
const loginAuth = require('../middleware/loginAuth')

//controllers
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
const cartController = require('../controllers/User/cartController')
const logoutController = require('../controllers/User/logoutController')
const searchResultController = require('../controllers/User/searchResultController')

router.get('/search',searchResultController.getSearch)
router.post('/checkout/payment',checkoutcontroller.payment)
//login
router.get("/login",loginAuth.userAuth,logincontrol.get)
router.post("/login",loginAuth.userAuth,logincontrol.post)

//logout
router.post("/logout",logoutController.logout)

router.get("/product/:id",loginAuth.JustLoginCheck,productcontroller.get)

router.get("/landing",loginAuth.JustLoginCheck,landingcontroller.get)

router.get("/categories",loginAuth.JustLoginCheck,categorycontroller.get)

//allproducts
router.get("/allproducts/:categoryname",loginAuth.JustLoginCheck,allproductscontroller.get)
router.post("/allproducts/filter",allproductscontroller.filter)

router.get("/orderconfirmed",orderconfirmedcontroller.get)

//cart
router.get("/cart",loginAuth.userlogincheck,cartcontroller.get)
router.post("/cart/addtocart",cartController.post)
router.post("/cart/removeproduct",cartController.removecart)


router.get("/checkout/:id",loginAuth.userlogincheck,checkoutcontroller.get)
router.post('/checkout/placeorder',checkoutcontroller.post)
router.post('/checkout/:id',loginAuth.userlogincheck,checkoutcontroller.getbuynow)


// router.post('/checkout/pay',orderconfirmedcontroller.payment)
router.get("/myorders",loginAuth.userlogincheck,myordercontroller.get)

//my-account
router.get("/myaccount",myaccountcontroller.get)
router.get("/myaccount/edit",myaccountcontroller.getedit)
router.post("/myaccount",myaccountcontroller.postEdit)

router.get("/ordersummary/:id",ordersummartcontroller.get)


router.get("/address/:id",addresscontroller.get)
router.post("/address",addresscontroller.post)
router.get('/address/edit/:id',addresscontroller.getedit)
router.post('/address/edit/:id',addresscontroller.postedit)

//enterotp
router.get("/enterotp",loginAuth.userAuth,enterotpcontroller.get)
router.post("/enterotp",loginAuth.userAuth,enterotpController.post)

//newuser
router.get("/newuser",newusercontroller.get)
router.post("/newuser",newusercontroller.post)

//aboutus
router.get("/aboutus",aboutuscontroller.get)


module.exports = router