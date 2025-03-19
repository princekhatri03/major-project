 const mongoose = require("mongoose");
 const Listing = require("D:/megaproject-1/models/listing.js");
 const initdata = require("./data.js");

 let mongoUrl = "mongodb://127.0.0.1:27017/wanderlust";
 main()
   .then(()=>{
     console.log("connected to db");
 }).catch((err)=>{
     console.log(err);
 });
 async function main(){
     await mongoose.connect(mongoUrl);
 };
 const initDB = async () =>{
  await Listing.deleteMany({});
  // confusing //
 initdata.data =initdata.data.map((obj)=>({
    ...obj,owner :"67bd8e20efb5a7bd3bc3bae9",
 }));
  await Listing.insertMany(initdata.data);
  console.log("data was initailized");
 };
 initDB();