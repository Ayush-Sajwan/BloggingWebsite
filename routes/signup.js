const express=require('express');
const User=require("../schemas/userSchema");
const router=express.Router();


router.route("/")
.get((req,res)=>{
    res.render("signup");
})
.post(async (req,res)=>{

    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const repassword=req.body.repassword;

    if(repassword===password){

        const check=await User.findOne({email:email});
 
        if(check){
            req.flash("message","Email Already Registered!! Try Logging in");
            res.redirect("/signup");
        }
        else{

        
            const result=await User.insertMany([{
                name:name,
                email:email,
                password:password,
                blogs_liked:[],
                followers:[],
                bio:'Update your Bio by Clicking Update Button',
                profileImage:""
            }]);

            if(result){
                res.redirect("/login");
            }
            else{
                res.send("Could not register you currently Please try after some time");
            }
        }

    }
    else{
        req.flash("message","Password Does not Match In Both Password Fields");
        res.redirect('/signup');
    }

})

module.exports=router;

