const express = require('express')
const cors = require('cors')

const app = express()

// routes
const TagRoute = require('./routes/tags.route')
const BlogRoute = require('./routes/blogs.route')

// middlewares
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/tags', TagRoute)
app.use('/blogs', BlogRoute)


module.exports = app