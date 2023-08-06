const express=require("express");
const ejs=require("ejs");
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
const session=require("express-session");
const User=require("./schemas/userSchema");
const flash=require("express-flash");
const authUser=require('./routes/autheticate');


const app=express();


app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret:"Tobi-is-Madara"
}));
app.use(flash());


//connecting to the mongoose db
mongoose.connect("mongodb://127.0.0.1:27017/blogKage")
.then(()=>{
    console.log("successfully connected to the database");
})


//home route
app.get("/",(req,res)=>{
    res.render("homePage");
})

//signup route
const signup=require('./routes/signup.js');
app.use("/signup",signup);


//login route
const login=require('./routes/login.js');
app.use("/login",login);

//blogs display route
const blogs=require('./routes/blogs.js');
app.use("/blogs",authUser,blogs);



//route for uploading files
const multer=require('multer');

const Storage=multer.diskStorage({
    destination:"./public/uploads/",
    filename: function (req, file, cb) {
        
        cb(null,file.fieldname +'_'+Date.now()+"_"+file.originalname);
      }
})

const upload=multer({
    storage:Storage
}).single('file');


//adding blogs route
const addblog=require('./routes/addBlog.js');
app.use("/addblog",authUser,upload,addblog);

//blog view route
const blogview=require('./routes/blogview.js');
app.use("/blogview",authUser,blogview);

//liking route
const like=require('./routes/like.js');
app.use("/blogs/like",authUser,like);


//like status route
const likeStatus=require('./routes/like-status.js');
app.use("/blogs/status",authUser,likeStatus);



//dashboard Route
const dashboard=require('./routes/dashboard.js');
app.use("/dashboard",authUser,dashboard);

//update profile photo route
const updateProfilePhoto=require('./routes/updateProfilePhoto.js');
app.use("/updateProfilePhoto",upload,updateProfilePhoto);

//update Bio route
const updateBio=require('./routes/updateBio.js');
app.use("/updateBio",authUser,updateBio);


//profileview route
const profileview=require('./routes/profileView.js');
app.use("/profileview",authUser,profileview);

//add follower route
const addfollower=require("./routes/addfollower.js");
app.use("/addfollower",authUser,addfollower);

//following status route
const followStatus=require("./routes/follow-status.js");
app.use("/follow-status",authUser,followStatus);


//commenting route
const comment=require('./routes/comment.js');
app.use("/comment",authUser,comment);


//logged in status route for logout button
const loginStatus=require('./routes/loggedInStatus.js');
app.use("/loginStatus",loginStatus);

//logout functionality for logout button
const logout=require('./routes/logout.js');
app.use("/logout",logout);



app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000");
})