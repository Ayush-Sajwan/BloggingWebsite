const express=require('express');
const User=require("../schemas/userSchema");
const Blog=require("../schemas/blogSchema.js");
const router=express.Router();

router.route("/")

.get((req,res)=>{
    res.render("addBlog");    
})

.post(async (req,res)=>{

    try{
        const title=req.body.title;
        const content=req.body.content;
        const file=req.file.filename;
        const email=req.session.email;

        const user=await User.findOne({email:email});

        const b=new Blog({
            title:title,
            user:user.name,
            user_id:user._id,
            content:content,
            image:file,
            likes:0,
            comment:[],
            date:new Date()
        });
        b.save().catch((err)=>{
            console.log(`Could not save due to error: ${err}`);
            res.send("could not add blog");
        });

    }
    catch(err){
        console.log(err);
    }
    
    res.redirect('/dashboard');
})


module.exports=router;