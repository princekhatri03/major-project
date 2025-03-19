const express =require("express");
const router =express.Router();
const User =require("../models/user.js");
let passport =require("passport");

const {savedRedirectUrl} = require("../middleware.js");

const userController =require("../controllers/user.js");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",userController.signUpUser);

router
   .route("/login")
   .get(async(req,res)=>{res.render("users/login.ejs");})
   .post(savedRedirectUrl,passport.authenticate("local",{
    failureRedirect : "/user/login",
    failureFlash :true,
}),userController.logInUser );

// using passport.authrnticate() as a middleware for authentication

router.post("/login",savedRedirectUrl,passport.authenticate("local",{
    failureRedirect : "/user/login",
    failureFlash :true,
}),userController.logInUser );

router.get("/logout",userController.logoutUser);

module.exports =router;