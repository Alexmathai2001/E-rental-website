const express = require('express')
const router = express.Router()

const logincontroller = require("../controllers/User/loginController")
const productscontroller = require("../controllers/User/productsController")
const landingcontroller = require("../controllers/User/landingController")
const categorycontroller = require("../controllers/User/categoryController")

router.get("/",logincontroller.get)
router.get("/products",productscontroller.get)
router.get("/landing",landingcontroller.get)
router.get("/categories",categorycontroller.get)

module.exports = router