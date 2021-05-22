const router = require("express").Router();
const controller = require("./../controller/tags.controller");
const passport = require("passport");

router.get("/", controller.getTags);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.getTagById
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.postTag
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.updateTag
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.deleteTag
);

module.exports = router;
