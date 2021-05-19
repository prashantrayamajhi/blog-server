const router = require("express").Router();
const controller = require("./../controller/blogs.controller");

router.get("/", controller.getBlogs);

router.get("/:id", controller.getBlogById);

router.post("/", controller.postBlog);

router.patch("/:id", controller.updateBlog);

router.delete("/:id", controller.deleteBlog);

module.exports = router;
