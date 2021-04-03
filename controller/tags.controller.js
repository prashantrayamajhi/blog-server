const Tag = require('./../models/Tag.model')
const { handleText } = require('./../helper/text')
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
        let {name} = req.body
        name = handleText(name)
        const isTag = await Tag.findOne({name})
        if(isTag) return res.status(409).send({err: "Tag already exists"})
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
        let {name} = req.body
        name = handleText(name)
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
        return res.status(200).send({msg: "Tag deleted"})
    }catch(err){
        console.log(err)
        return res.status(500).send({err})
    }
}