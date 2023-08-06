const express=require('express');
const router=express.Router();

router.get("/",(req,res)=>{

    req.session.destroy(function(err) {
       
        console.log("User session destroyed");
        res.redirect('/login');
      })
})

module.exports=router;