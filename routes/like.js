const express=require('express');
const Blog=require("../schemas/blogSchema.js");
const User=require("../schemas/userSchema.js");
const router=express.Router();


router.route("/:id")
.get(async (req,res)=>{


    //blog id
    const blog_id=req.params.id;

    const email=req.session.email;
    const user=await User.findOne({email:email});


    //if blog already exists then unliking it 
    if(user.blogs_liked.includes(blog_id)){

        try{
        //removing blog id from the user liked blogs
            await User.updateOne(
                { email: email },
                { $pull: { blogs_liked: blog_id } });
            
            //decrementing the likes in the blog  
            await Blog.updateOne(
                { _id: req.params.id },
                { $inc: { likes: -1 } } 
                )
        }catch(err){
            console.log(`${err} occured while unliking `);
        }

    }
    //if it does not exist then liking and adding its id to user liked blogs
    else{

        try{

            //adding the blog id to the user
            await User.updateOne(
                {email:email},
                {$push:{blogs_liked:blog_id}}
            );

            await Blog.updateOne(
                 { _id: req.params.id },
                 { $inc: { likes: 1 } } 
               )
         }catch(err){
             console.log(`${err} occured while liking `);
         }

    }
    //sending the response to user
    //i.e. the likes of blog to set
    try{
       let result= await Blog.findOne(
             { _id: req.params.id }
           )

        res.json(result);
     }catch(err){
         console.log(`${err} occured while sending response `);
     }
   
    
});


module.exports=router;