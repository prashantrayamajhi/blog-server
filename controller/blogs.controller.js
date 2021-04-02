const Blog = require('./../models/Blog.model')

exports.getBlogs = async (req,res) => {
    try{
        const blogs = await Blog.find()
        return res.status(200).json({data: blogs})
    }catch(err){
        console.log(err)
        return res.status(500).send({err})
    }
}


exports.getBlogById = async (req,res) => {
    try{
        const {id} = req.params
        const blog = await Blog.findById(id)
        if(!blog) return res.status(404).send({err: 'Blog not found'})
        return res.status(200).json({data: blog})
    }catch(err){
        console.log(err)
        return res.status(500).send({err})
    }
}

exports.postBlog = async (req,res) => {
    try{
        const { title, img, tag, content } = req.body
        const blog = new Blog({ title, img, tag, content })
        await blog.save()
        return res.status(201).json({data: blog})
    }catch(err){
        console.log(err)
        return res.status(500).send({err})
    }
}

exports.updateBlog = async (req,res) => {
    try{
        const id = req.params.id
        const blog = await Blog.findById(id)
        if(!blog) return res.status(404).send({err: 'Blog not found'})
        const { title, img, tag, content } = req.body
        await Blog.findByIdAndUpdate({_id: id}, {title, img, tag, content}, (err, result) => {
            if(err){
                console.log(err)
                return res.status(500).send({err})
            }else{
                return res.status(200).json({data: result})
            }
        })
    }catch(err){
        console.log(err)
        return res.status(500).send({err})
    }
}

exports.deleteBlog = async (req,res) => {
    try{
        const id = req.params.id
        const blog = await Blog.findById(id)
        if(!blog) return res.status(404).send({err: 'Blog not found'})
        await Blog.findOneAndDelete({_id: id})
        return res.satus(200).send({msg: "Blog deleted"})
    }catch(err){
        console.log(err)
        return res.status(500).send({err})
    }
}
