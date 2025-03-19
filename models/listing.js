const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Reviews = require("./review.js");
let listingSchema = new Schema({
    title: {
      type :String,
      required: true,
    },
    description : String ,
    image : {
        url:{
        type: String,
        default: "https://th.bing.com/th/id/OIP.vGwei_IvdHK431zOgLBj6wHaEo?rs=1&pid=ImgDetMain",
        set: (v)=>  v ===""? "https://th.bing.com/th/id/OIP.vGwei_IvdHK431zOgLBj6wHaEo?rs=1&pid=ImgDetMain": v,
}},
    price : Number ,
    location : String,
    country:String,
    review:[{
      type:Schema.Types.ObjectId,
      ref:"reviews",}
          ],
    owner:
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
});
listingSchema.post("findOneAndDelete",async(listing)=>{
  console.log("hi")
  await Reviews.deleteMany({_id: { $in : listing.review}});

})
 let Listing = mongoose.model("Listing",listingSchema);
 module.exports =Listing;
