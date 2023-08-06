const express=require("express");
const ejs=require("ejs");
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
const session=require("express-session");
const flash=require("express-flash");
const authUser=require('./middleware/autheticate');


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
app.use("/signup",require('./routes/signup'));

//login route
app.use("/login",require('./routes/login'));

//blogs display route
app.use("/blogs",authUser,require('./routes/blogs'));

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
app.use("/addblog",authUser,upload,require('./routes/addBlog'));

//blog view route
app.use("/blogview",authUser,require('./routes/blogview'));

//liking route
app.use("/blogs/like",authUser,require('./routes/like'));

//like status route
app.use("/blogs/status",authUser,require('./routes/like-status'));

//dashboard Route
app.use("/dashboard",authUser,require('./routes/dashboard'));

//update profile photo route
app.use("/updateProfilePhoto",upload,require('./routes/updateProfilePhoto'));

//update Bio route
app.use("/updateBio",authUser,require('./routes/updateBio'));

//profileview route
app.use("/profileview",authUser,require('./routes/profileView'));

//add follower route
app.use("/addfollower",authUser,require("./routes/addfollower"));

//following status route
app.use("/follow-status",authUser,require("./routes/follow-status"));

//commenting route
app.use("/comment",authUser,require('./routes/comment'));

//logged in status route for logout button
app.use("/loginStatus",require('./routes/loggedInStatus'));

//logout functionality for logout button
app.use("/logout",require('./routes/logout'));



app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000");
})