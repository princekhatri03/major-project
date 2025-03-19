const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");

const { listingSchema } = require("../schemajoi.js");

const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");

const listingControl = require("../controllers/listing.js");
 const multer =require('multer');
 const upload = multer(
 );  //

const validateListing = (req, res, next) => {
    // let result = listingSchema.validate(req.body);
    // if(result.error){
    let { error } = listingSchema.validate(req.body);
    if (error) {
        // let errormsg = error.details.map((el) => el.message).join(",");
        let errormsg = "hii";
        throw new ExpressError(400, errormsg);
    } else {
        next(); 
    }
};
const listingimage =null ;
// index routing
router
    .route("/")
    .get(wrapAsync(listingControl.index))
    .post(isLoggedIn, validateListing, wrapAsync(listingControl.renderNewForm));
// add route
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listing/new.ejs");
});
// show routing
router.get("/:id", wrapAsync(listingControl.showListing));

// create route
router.post("/",upload.single(listingimage),(req,res)=>{
    // console.log(req.file);
     listingimage =req.body.listing[image];
    // res.send(req.file);
  });
 
     
// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingControl.editForm));
//update route 
router.put("/:id", isLoggedIn, isOwner, wrapAsync(listingControl.updateListing));
// delete route
router.get("/:id/delete", isLoggedIn, isOwner, wrapAsync(listingControl.deleteListing));
//test
router.get("/listingTest", wrapAsync(async (req, res) => {
    let sampleListing = new Listing({
        title: "My Villa",
        description: "Luxury villa to stay.",
        price: 20000,
        location: "New Delhi",
        country: "India",
    });
    await sampleListing.save();
    console.log("sample saved");
    res.send("lisitng successful");
}));


module.exports = router;