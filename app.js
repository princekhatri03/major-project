const express =require("express");
const app =express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
// const Reviews = require("./models/review.js");

const listingRouter =require("./routes/listing.js");
const reviewRouter = require("./routes/review.js"); 
const userRouter = require("./routes/user.js"); 

const multer =require("multer");
const upload =multer();

const passport =require("passport");
const localStrategy =require("passport-local");
const User =require("./models/user.js");

const path =require("path");
const ejsMate = require("ejs-mate");
app.engine("ejs",ejsMate);

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
 app.use(express.urlencoded({extended : true}));

let methodOverride = require("method-override");
app.use(methodOverride("_method"));

// to use static files
app.use(express.static(path.join(__dirname,"/public")));
const dotenv =  require('dotenv')
dotenv.config();
let dbUrl = process.env.APPDBURL;
main()
  .then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(dbUrl);
};
// requiring from utils
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/expressError.js");

// const {listingSchema,reviewSchema} = require("./schemajoi.js");

// express-session
const session =require("express-session");
const flash =require("connect-flash");
const MongoStore =require("connect-mongo");

let store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("error in mongosession store".err);
});

const sessionOptions ={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+ 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/demouser",async (req,res)=>{
    let fakeUser =new User({
        username: "hellomyworld",
        password:"letplay",
        email:"www2006@gmail.com",
    });
    let  result = await User.register(fakeUser,"letplay");
    res.send(result);
})

app.use((req,res,next)=>{
    res.locals.success =req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curruser = req.user;
    next();
})

// home routing
app.get("/",(req,res)=>{
    // req.time = new Date(Date.now()).toString();
    // Define middleware before all the api requests .
   
    console.log(req.time);
    res.send("Hi, i am root.");
    
});

app.use("/listing",listingRouter);
app.use("/listing/:id/review",reviewRouter);
app.use("/user",userRouter);


app.listen(8080,()=>{
    console.log("server is listening to port:8080");
});

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found !"));
});

app.use((err,req,res,next)=>{
     let {statusCode = 500,message} = err;
     res.status(statusCode).render("./listing/error.ejs",{message});
     console.log("----ERROR-----");
   
 });
//  app.use((err,req,res,next)=>{
//      console.log("----ERROR2-----");
//  });
//  app.get("/jaat",(req,res)=>{
//      abcd=abcd;
//  });
//  app.use((err,req,res,next)=>{
//     //  console.log("----ERROR2-----");
//      let {status =500 ,message ="some err"} = err;
//    res.status(status).send("meassage");
//  });