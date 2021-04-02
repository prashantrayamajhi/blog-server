const router = require('express').Router()
const controller = require('./../controller/tags.controller')

router.get('/', controller.getTags)

router.get('/:id', controller.getTagById)

router.post('/', controller.postTag)

router.patch('/:id', controller.updateTag)

router.delete('/:id', controller.deleteTag)

module.exports = router