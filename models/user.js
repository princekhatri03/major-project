const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const localpassportMongoose =require("passport-local-mongoose");

const  userSchema =Schema({
    email:{
        type:String,
        required:true,
    }
})
userSchema.plugin(localpassportMongoose);
module.exports =mongoose.model("User",userSchema);