const express=require('express');
const User=require("../schemas/userSchema");
const router=express.Router();
const fs=require('fs');
const path = require('path');

router.route("/:id")
.post(async (req,res)=>{

    try{

        const user=await User.findById({_id:req.params.id});

        // const path='./public/uploads/'+user.profileImage;
        const filePath = path.join(__dirname, '..', 'public','uploads', user.profileImage);


        fs.unlinkSync(filePath);
        
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