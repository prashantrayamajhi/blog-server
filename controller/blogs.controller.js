const Blog = require("./../models/Blog.model");

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).populate("tag");
    return res.status(200).json({ data: blogs });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("tag");
    if (!blog) return res.status(404).send({ err: "Blog not found" });
    return res.status(200).json({ data: blog });
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

    const data = await blog.save();
    return res.status(200).json({ data });

    // await Blog.findByIdAndUpdate(
    //   { _id: id },
    //   { title, tag, description, content },
    //   { runValidators: true },
    //   (err, result) => {
    //     if (err) {
    //       console.log(err);
    //       return res.status(500).send({ err });
    //     } else {
    //       return res.status(200).json({ data: result });
    //     }
    //   }
    // );
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
