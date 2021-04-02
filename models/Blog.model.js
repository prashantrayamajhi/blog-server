const mongoose = require('mongoose')
var dateFormat = require("dateformat");
var now = new Date();
const date = dateFormat(now, "mmmm dS, yyyy")

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    date:{
        type: String,
        default: date,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
    
})

const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog