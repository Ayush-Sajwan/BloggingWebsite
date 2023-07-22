const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

    name:String,
    email:String,
    password:String,
    blogs_liked:[String],
    followers:[String],
    profileImage:String,
    bio:String
});

const User=mongoose.model("User",userSchema);

module.exports=User;