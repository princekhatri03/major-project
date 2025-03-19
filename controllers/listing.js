const Listing =require("../models/listing.js");

module.exports.index =async (req,res)=>{
    let allListing = await Listing.find({});
 
    
    res.render("listing/index.ejs",{allListing});
};

module.exports.showListing =async (req,res) =>{
    let {id} =req.params;   
    
   const listing =  await Listing.findById(id).populate({
    path:"review",
       populate:{
        path:"author",
       },
    })
       .populate("owner");
   if(!listing){
    req.flash("error","Listing does not exist or you may have deleted it");
    res.redirect("/listing");
   }
   res.render("listing/show.ejs",{listing});
};

module.exports.renderNewForm =async (req,res,next)=>{
    console.log("HIII");    
    let  listing =   req.body.listing;   //here req.body send object ke andar listing object
    if(!listing){
        console.log("HI");
        throw new ExpressError(400,"send valid data for listing");
    }
      let newlisting  = new Listing(listing);
      newlisting.owner =req.user._id;
    await  newlisting.save();
     req.flash("success","New List Created!");
      res.redirect("/listing");
      
    };
module.exports.editForm =async (req,res)=>{
       let {id} = req.params;
       const listing = await Listing.findById(id);
       
       res.render("listing/edit.ejs",{listing});
   
};
module.exports.updateListing =async(req,res)=>{
    let {id} = req.params;
    if(!req.body.listing){
        throw new ExpressError(400,"send valid data for listing");
    }
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
   req.flash("success"," List Updated!");
    res.redirect(`/listing/${id}`);
};
module.exports.deleteListing =async (req,res)=>{
    let {id} =req.params;
  let deletedlist = await Listing.findByIdAndDelete(id);
  console.log("enter");
  console.log(deletedlist);
  req.flash("success"," List Deleted!");
  res.redirect("/listing");
 };