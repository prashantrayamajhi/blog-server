const router = require("express").Router();
const controller = require("./../controller/blogs.controller");
const passport = require("passport");

router.get("/", controller.getBlogs);

router.get("/:id", controller.getBlogById);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.postBlog
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.updateBlog
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.deleteBlog
);

module.exports = router;
