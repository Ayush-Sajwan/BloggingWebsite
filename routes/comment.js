const express=require('express');
const Blog=require("../schemas/blogSchema.js");
const router=express.Router();

router.route("/:id")

.get((req,res)=>{

    res.render("comment",{id:req.params.id});
})

.post(async (req,res)=>{

    const id=req.params.id;

    const user=req.session.username;

    const content=req.body.content;

    if(content==""){
        res.redirect("/blogview/"+req.params.id);
    }

    else{

    
    try{
    await Blog.updateOne(
        {_id:id},
        {$push:{ comment: {
            user:user,
            content:content,
            likes:0
        }}}
    );

    }catch(err){
        console.log(`${err} occured cannot comment`);
        res.send("Error occured cannot comment at the moment");
    }

    res.redirect("/blogview/"+req.params.id);

    }
})

module.exports=router;
