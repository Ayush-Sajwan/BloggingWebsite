const express=require('express');
const User=require("../schemas/userSchema");
const router=express.Router();

router.route("/")
.get(async (req,res)=>{

    try{
        const email=req.session.email;
    
        const user=await User.findOne({email:email});
        res.render("updateBio",{bio:user.bio});
    
    }catch(err){
        console.log(err);
        res.redirect('/login');
    }
    
})

.post(async (req,res)=>{

    try{
    const email=req.session.email;

    await User.updateOne(
        {email:email},
        {$set:{bio:req.body.bio}}
        );

    }catch(err){
        console.log(err);
        res.redirect('/login');
    }

    res.redirect('/dashboard');
});

module.exports=router;