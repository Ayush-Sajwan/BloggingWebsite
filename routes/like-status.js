const express=require('express');
const Blog=require("../schemas/blogSchema.js");
const User=require("../schemas/userSchema.js");
const router=express.Router();

router.route("/")
.get(async (req,res)=>{

    try{
        const email=req.session.email;
    
        const result=await User.findOne({email:email});
        res.json(result);
 
    }
    catch(err){
        console.log(`${err} occured while sending status of likes `);
        res.redirect("/login");
    }
});

module.exports=router;