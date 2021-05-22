const express = require("express");
const cors = require("cors");

const app = express();
const passport = require("passport");
require("./security/passport")(passport);

// routes
const TagRoute = require("./routes/tags.route");
const BlogRoute = require("./routes/blogs.route");
const AuthRoute = require("./routes/auth.route");

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/tags", TagRoute);
app.use("/api/v1/blogs", BlogRoute);
app.use("/api/v1/auth", AuthRoute);

module.exports = app;
