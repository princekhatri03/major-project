const User =require("../models/user.js");
module.exports.signUpUser =async(req,res)=>{
   try{
    let {username,email,password} = req.body;
    let newUser =new User({username,email});
    let registeredUser =await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }       
        req.flash("success","Welcome to Wanderlust!");
        res.redirect("/listing");
    });
    // console.log(registeredUser.User);
   } catch(e){
    req.flash("error",e.message);
    res.redirect("/user/signup");
   }
};
module.exports.logInUser =async(req,res)=>{
    req.flash("success","Welcome back to WanderLust!");
    let redirectUrl =res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
};
module.exports.logoutUser =(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        };
        req.flash("success","you are logged out!");
        res.redirect("/listing");
    });
;}
