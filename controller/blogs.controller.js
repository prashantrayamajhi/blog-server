const Blog = require("./../models/Blog.model");

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("user", "-password");
    return res.status(200).json({ data: blogs });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.getBlogsBySearch = async (req, res) => {
  const { term } = req.params;
  try {
    if (term) {
      const data = await Blog.find({ $text: { $search: term } })
        .sort({ createdAt: -1 })
        .populate("user", "-password");
      return res.status(200).json({ data });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate("user", "-password");
    if (!blog) return res.status(404).send({ err: "Blog not found" });
    return res.status(200).json({ data: blog });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.getBlogsByTags = async (req, res) => {
  const { tags } = req.body;
  try {
    const data = await Blog.find({
      tag: { $in: tags },
    })
      .sort({ createdAt: -1 })
      .populate("tag");
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.postBlog = async (req, res) => {
  let { title, tag, description, content } = req.body;
  try {
    const blog = new Blog({
      title,
      tag,
      description,
      content,
      user: req.user._id,
    });
    await blog.save();
    return res.status(201).json({ data: blog });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.updateBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).send({ err: "Blog not found" });
    const { title, tag, description, content } = req.body;
    blog.title = title;
    blog.tag = tag;
    blog.description = description;
    blog.content = content;
    blog.user = user;

    const data = await blog.save();
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).send({ err: "Blog not found" });
    await Blog.findOneAndDelete({ _id: id });
    return res.status(200).send({ msg: "Blog deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};
