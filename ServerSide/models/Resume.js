const mongoose = require('mongoose');
 const timestamp = require('mongoose-timestamp');


 const ResumeSchema = new mongoose.Schema({
   //add requirements


   firstname: {
     type:String,
     default :"",
     trim:true
   },

   lastname:{
     type:String,
     default :"",
     trim:true

   },

   email:{
     type :String,
  default :"",


     trim:true
   },


   phone:{
     type : String,
     default :"",

   }
   ,
   workExp :{
     type :[String],
     default : ""
   }



 });
 ResumeSchema.plugin(timestamp);

 const Resumes = mongoose.model('Resumes',ResumeSchema);
 module.exports = Resumes
