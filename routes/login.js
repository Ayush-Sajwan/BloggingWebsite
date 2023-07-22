const express=require('express');
const User=require("../schemas/userSchema");
const router=express.Router();


router.route("/")
.get((req,res)=>{

    if(req.session.loggedIn){

        res.redirect("/dashboard");
    }
    else{

        res.render("login");
    }

})
.post(async (req,res)=>{

    const email=req.body.email;
    const password=req.body.password;

    const userData=await User.findOne({email:email});

    if(userData){
        

        if(userData.password===password){

            req.session.username=userData.name;
            req.session.email=userData.email;
            req.session.loggedIn=true;
            
            req.session.save((err)=>{
                if(err) console.log(err);
                else console.log("user session created");
            })

            res.redirect("/dashboard");

           
        }
        else{
            req.flash("message","Incorrect Password!! Please Check it");
            res.redirect("/login");
            
        }



    }
    else{

        req.flash("message","Email is not registered !! Please Signup!!");
        res.redirect("/login");
    }

    
})

module.exports=router;