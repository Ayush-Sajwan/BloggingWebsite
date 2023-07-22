const express=require("express");
const ejs=require("ejs");
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
const session=require("express-session");
const User=require("./schemas/userSchema");
const flash=require("express-flash");


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
app.use("/blogs",blogs);



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
app.use("/addblog",upload,addblog);

//blog view route
const blogview=require('./routes/blogview.js');
app.use("/blogview",blogview);

//liking route
const like=require('./routes/like.js');
app.use("/blogs/like",like);


//like status route
app.get("/blogs/status",async (req,res)=>{

    try{
        const email=req.session.email;
    
        const result=await User.findOne({email:email});
        res.json(result);
 
    }
    catch(err){
        console.log(`${err} occured while sending status of likes `);
    }
});

//dashboard Route
const dashboard=require('./routes/dashboard.js');
app.use("/dashboard",dashboard);

//update profile photo route
const updateProfilePhoto=require('./routes/updateProfilePhoto.js');
app.use("/updateProfilePhoto",upload,updateProfilePhoto);

//update Bio route
const updateBio=require('./routes/updateBio.js');
app.use("/updateBio",updateBio);


//profileview route
const profileview=require('./routes/profileView.js');
app.use("/profileview",profileview);

//add follower route
const addfollower=require("./routes/addfollower.js");
app.use("/addfollower",addfollower);

//following status route
app.get("/follow-status/:id",async (req,res)=>{

    try{
        const email=req.session.email;
        const id=req.params.id;

        const fUser=await User.findOne({_id:id});
    
        const cUser=await User.findOne({email:email});

        if(fUser.followers.includes(cUser._id)){
            res.json({status:true});
        }
        else{
            
            res.json({status:false});
        }
       
 
    }
    catch(err){
        console.log(`${err} occured while sending status of likes `);
    }
});


//commenting route
const comment=require('./routes/comment.js');
app.use("/comment",comment);






app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000");
})