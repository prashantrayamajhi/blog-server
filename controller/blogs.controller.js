const Blog = require('./../models/Blog.model')
const cloudinaryConfig = require('./../helper/cloudinary')
const cloudinary = require('cloudinary')
const fs = require('fs')

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
    cloudinaryConfig()
    try{
        const { title, tag, content } = req.body
        const img = req.file

        cloudinary.v2.uploader.upload(img.path,{
            public_id: 'blogs/'+img.filename
        }, async (err,result) => {
            fs.unlinkSync(img.path)
            if(err) return res.status(500).send({err})
            const blog = new Blog({ title, tag, content, img: result.secure_url, publicId: result.public_id })
            await blog.save()
            return res.status(201).json({data: blog})
        })
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
    cloudinaryConfig()
    try{
        const id = req.params.id
        const blog = await Blog.findById(id)
        if(!blog) return res.status(404).send({err: 'Blog not found'})
        cloudinary.v2.uploader.destroy(blog.publicId, async (err, result) => {
            if(err) return res.status(500).send({err})
            await Blog.findOneAndDelete({_id: id})
            return res.status(200).send({msg: "Blog deleted"})
        })
    }catch(err){
        console.log(err)
        return res.status(500).send({err})
    }
}
