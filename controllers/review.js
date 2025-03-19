const Listing =require("../models/listing.js");
const Reviews =require("../models/review.js");

module.exports.addReview =async(req,res)=>{
    let listing =  await  Listing.findById(req.params.id);
    let newReview =new Reviews(
      req.body.review
    );
    newReview.author =req.user._id;  
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listing/${listing._id}`);
  };

module.exports.deleteReview = async(req,res)=>{
    let {id,reviewid} = req.params;
    console.log(id);
    console.log(reviewid);
    await Listing.findByIdAndUpdate(id,{$pull :{reviews:reviewid}});
    await Reviews.findByIdAndDelete(reviewid);
    res.redirect(`/listing/${id}`);
};