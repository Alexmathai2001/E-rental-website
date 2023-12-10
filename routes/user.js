const express = require('express')
const router = express.Router()

const logincontroller = require("../controllers/User/loginController")
const productscontroller = require("../controllers/User/productsController")
const landingcontroller = require("../controllers/User/landingController")
const categorycontroller = require("../controllers/User/categoryController")
const allproductscontroller = require("../controllers/User/all-productsController")
const orderconfirmedcontroller = require("../controllers/User/order-confirmedController")
const cartcontroller = require("../controllers/User/cartController")

router.get("/",logincontroller.get)
router.get("/products",productscontroller.get)
router.get("/landing",landingcontroller.get)
router.get("/categories",categorycontroller.get)
router.get("/allproducts",allproductscontroller.get)
router.get("/orderconfirmed",orderconfirmedcontroller.get)
router.get("/cart",cartcontroller.get)

module.exports = router