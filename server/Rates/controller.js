const Rate = require('./Rates')
const saveRate = async(req, res)=>{
    
    if(req.body.authorId && req.body.blogId){
        await new Rate({
            text: req.body.text,
            blogId: req.body.blogId,
            authorId: req.body.authorId,
        }).save()
        res.status(200).send(true)

    }
}

module.exports ={
    saveRate,
}