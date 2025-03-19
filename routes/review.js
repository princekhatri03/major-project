const express =require("express");
const router =express.Router({mergeParams:true});

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");

const {reviewSchema} = require("../schemajoi.js");
const {isReviewAuthor} =  require("../middleware.js")

const Listing = require("../models/listing.js");
const Reviews = require("../models/review.js");
const {isLoggedIn} =require("../middleware.js");

const reviewController =require("../controllers/review.js");
// review routing
const validateReview =(req,res,next)=>{
    // let result = listingSchema.validate(req.body);
    // if(result.error){
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errormsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400,errormsg);
    }else{
        next();
    }
};

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.addReview));

 // delete review route
router.delete("/:reviewid",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));
 module.exports =router;
