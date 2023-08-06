const express=require('express');
const router=express.Router();

router.get("/",(req,res)=>{

    req.session.destroy(function(err) {
        // cannot access session here
        res.redirect('/login');
      })
})

module.exports=router;