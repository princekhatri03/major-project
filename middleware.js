const Listing = require("./models/listing.js");
const Reviews = require("./models/review.js");
module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        console.log(req.originalUrl);
         req.session.redirectUrl =req.originalUrl; 
         // or req.path = storesd relative path
         console.log(req.session.redirectUrl);
        req.flash("error","you must be logged in to create lisitng");
        return res.redirect("/user/login");

    }
    next();
};
module.exports.savedRedirectUrl =(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl =req.session.redirectUrl;
        console.log(res.locals.redirectUrl);
    }
    next();
};
 module.exports.isReviewAuthor =async (req,res,next)=>{
     let {id,reviewid} = req.params;
     
     let review = await Reviews.findById(reviewid);
     
     if(!review.author.equals(res.locals.curruser._id)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listing/${id}`);
     }
     next();
 };
 module.exports.isOwner =async (req,res,next)=>{
     let {id} = req.params;
    
     let listing = await Listing.findById(id);
    
     if(!listing.owner._id.equals(res.locals.curruser._id)){
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listing/${id}`);
     }
     next();
 };