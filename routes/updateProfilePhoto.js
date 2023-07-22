const express=require('express');
const User=require("../schemas/userSchema");
const router=express.Router();

router.route("/:id")
.post(async (req,res)=>{

    try{

        await User.updateOne(
            {_id:req.params.id},
            {$set:{profileImage:req.file.filename}}
        );
    }
    catch(err){
        console.log(err);
    }

    res.redirect('/dashboard');
})

module.exports=router;