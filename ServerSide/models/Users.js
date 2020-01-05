const mongoose = require('mongoose');
 const timestamp = require('mongoose-timestamp');


 const UsersSchema = new mongoose.Schema({
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


   password:{
     type : String,
     default :"",

   }



 });
 UsersSchema.plugin(timestamp);

 const Users = mongoose.model('Users',UsersSchema);
 module.exports = Users
