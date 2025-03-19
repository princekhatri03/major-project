const { number } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let reviewSchema = Schema({
     rating : {
        type : Number,
        min:1,
        max:5,
     },
     comment :{
        type: String,
     },
     createdAt: {
       type: Date,
       deafault: Date.now(), 
     },
     author:{
      type: Schema.Types.ObjectId,
      ref:"User",
     },
});
let Reviews =mongoose.model("reviews",reviewSchema);
module.exports =Reviews;