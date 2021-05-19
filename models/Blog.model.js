const mongoose = require("mongoose");
var dateFormat = require("dateformat");
const marked = require("marked");
var now = new Date();
const date = dateFormat(now, "mmmm dS, yyyy");
const createDomPurifier = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurifier(new JSDOM().window);

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      default: date,
      required: true,
    },
    tag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    sanitizedHTML: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

BlogSchema.pre("validate", function (next) {
  const blogs = this;
  if (blogs.content) {
    blogs.sanitizedHTML = dompurify.sanitize(marked(blogs.content));
  }
  next();
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
