const mongoose=require("mongoose");

const commentSchema=new mongoose.Schema({
    user:String,
    content:String,
    likes:Number
});

const blogSchema=new mongoose.Schema({

    user:String,
    user_id:String,
    title:String,
    content:String,
    image:String,
    date:Date,
    likes:Number,
    comment:[commentSchema],
    
});

const Blog=mongoose.model("Blog",blogSchema);

module.exports=Blog;