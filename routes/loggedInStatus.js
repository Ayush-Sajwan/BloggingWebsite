const express=require('express');
const router=express.Router();

router.get("/",(req,res)=>{

    if(req.session.email){
        res.json({status:true});
    }
    else{
        res.json({status:false});
    }
})

module.exports=router;