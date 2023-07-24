const express=require('express');
const Blog=require("../schemas/blogSchema.js");
const User=require("../schemas/userSchema.js");
const router=express.Router();


router.route("/:id")
.get(async (req,res)=>{
    try{
        const email=req.session.email;
        const id=req.params.id;

        //getting the user for which we want to check if current user is following or not
        const fUser=await User.findOne({_id:id});
    
        //getting the data of the current user
        const cUser=await User.findOne({email:email});

        //if current user id exists in the followers array of fuser then returning true
        if(fUser.followers.includes(cUser._id)){
            res.json({status:true});
        }
        else{
            
            res.json({status:false});
        }
       
 
    }
    catch(err){
        console.log(`${err} occured while sending status of likes `);
        res.redirect("/login");
    }
});

module.exports=router;
