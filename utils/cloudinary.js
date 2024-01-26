require("dotenv").config()

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name : 'dtpgynpz0',
    api_key : process.env.cloudinary_api_key,
    api_secret : process.env.cloudinary_secret_key
})

module.exports = cloudinary;