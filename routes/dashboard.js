const express=require('express');
const User=require("../schemas/userSchema");
const Blog=require("../schemas/blogSchema");
const router=express.Router();

router.route("/")
.get(async (req,res)=>{
    try{
    const email=req.session.email;
    const user=await User.findOne({email:email});

    const blogs=await Blog.find({user_id:user._id});

    res.render("dashboard",{user:user,blogs:blogs});

    }
    catch(err){
        console.log(err);
        res.redirect("/login");
    }
});


module.exports=router;
