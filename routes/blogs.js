const express=require('express');
const Blog=require("../schemas/blogSchema.js");
const User = require('../schemas/userSchema.js');
const router=express.Router();

router.route("/")
.get(async (req,res)=>{

    if(req.session.loggedIn){

        try{
            const email=req.session.email;

            const user=await User.findOne({email:email});

            const result=await Blog.find({});
            res.render("blogs",{blogs:result});
        }
        catch(err){
            console.log(`${err} occured while loading the blog page`);
            res.redirect('/login');
        }
    }
    else{

        res.redirect('/login');
    }
    
});

module.exports=router;
