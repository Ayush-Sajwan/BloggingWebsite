const express=require('express');
const Blog=require("../schemas/blogSchema.js");
const User=require("../schemas/userSchema.js");
const router=express.Router();


router.route("/:id")
.get(async (req,res)=>{

    try{

        const id=req.params.id;
        const followUser=await User.findOne({_id:id});

        const currUser=await User.findOne({email:req.session.email});

        //if user exists in the follower list of the follow user then removing it
        if(followUser.followers.includes(currUser._id)){
            await User.updateOne(
                {_id:followUser._id},
                {$pull:{followers:currUser._id}}
            );
        }
        else{
            await User.updateOne(
                {_id:followUser._id},
                {$push:{followers:currUser._id}}
            );
        }

        const fuser=await User.findOne({_id:id});
        res.json(fuser);


    }catch(err){
        console.log(err);
        res.redirect("/login");
    }

})

module.exports=router;