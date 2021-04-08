const router = require('express').Router()
const controller = require('./../controller/blogs.controller')
const upload = require('./../middlewares/multer')

router.get('/', controller.getBlogs)

router.get('/:id', controller.getBlogById)

router.post('/', upload.single('image'), controller.postBlog)

router.patch('/:id', upload.single('image'), controller.updateBlog)

router.delete('/:id', controller.deleteBlog)

module.exports = router