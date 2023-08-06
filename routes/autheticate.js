const express=require("express");


function auth(req,res,next){

    
    if(req.session.email){
        next();
    }
    else{
        req.flash("message","Please Login First!!");
        res.redirect("/login");
    }
}

module.exports=auth;