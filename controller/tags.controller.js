const Tag = require('./../models/Tag.model')

exports.getTags = async (req,res) => {
    try{
        const tags = await Tag.find()
        return res.status(200).json({data: tags})
    }catch(err){
        console.log(err)
        return res.status(500).send({err})
    }
}

exports.getTagById = async (req,res) => {
    try{
        const id = req.params.id
        const tag = await Tag.findById(id)
        if(!tag) return res.status(404).send({err: 'Tag not found'})
        return res.status(200).json({data: tag})
    }catch(err){
        console.log(err)
        return res.status(500).send({err})
    }
}

exports.postTag = async (req,res) => {
    try{
        const {name} = req.body
        const tag = new Tag({name})
        await tag.save()
        return res.status(201).json({data: tag})
    }catch(err){
        console.log(err)
        return res.status(500).send({err})
    }
}

exports.updateTag = async (req,res) => {
    try{
        const id = req.params.id
        const tag = await Tag.findById(id)
        if(!tag) return res.status(404).send({err: 'Tag not found'}) 
        const {name} = req.body
        await Tag.findByIdAndUpdate({_id: id}, {
            name: name
        }, (err, result) => {
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

exports.deleteTag = async (req,res) => {
    try{
        const id = req.params.id
        const tag = await Tag.findById(id)
        if(!tag) return res.status(404).send({err: 'Tag not found'}) 
        await Tag.findOneAndDelete({_id: id})
        return res.satus(200).send({msg: "Tag deleted"})
    }catch(err){
        console.log(err)
        return res.status(500).send({err})
    }
}