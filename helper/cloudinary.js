const cloudinary = require('cloudinary')

const cloudinaryConfig = () => {
    cloudinary.v2.config({
        cloud_name: 'prashantrayamajhi',
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
}

module.exports = cloudinaryConfig