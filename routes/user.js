const express = require('express')
const router = express.Router()

const logincontroller = require("../controllers/User/loginController")
const productscontroller = require("../controllers/User/productsController")
const landingcontroller = require("../controllers/User/landingController")

router.get("/",logincontroller.get)
router.get("/products",productscontroller.get)
router.get("/landing",landingcontroller.get)

module.exports = router