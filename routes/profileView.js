const express=require('express');
const User=require("../schemas/userSchema");
const Blog=require("../schemas/blogSchema");
const router=express.Router();

router.route("/:id")
.get(async (req,res)=>{
    
    try{

        const id=req.params.id;
        const user=await User.findOne({_id:id});

        const blogs=await Blog.find({user_id:id});
        res.render('profileView',{user:user,blogs:blogs});
    }
    catch(err){

        console.log(err);
        res.redirect("/login");
    }
    
})


module.exports=router;