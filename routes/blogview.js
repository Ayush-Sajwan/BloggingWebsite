const express=require('express');
const Blog=require("../schemas/blogSchema.js");
const router=express.Router();

router.route("/:id")
.get( async (req,res)=>{

    const id=req.params.id;

    try{
        const result=await Blog.findOne({_id:id});
        res.render("blogview",{blog:result});
    }
    catch(err){
        console.log(`${err} occured while loading the blog`);
        res.send("Sorry an Error occured at our side");
    }

})

module.exports=router;