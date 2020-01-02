const mongoose = require('mongoose');
 const timestamp = require('mongoose-timestamp');


 const UsersSchema = new mongoose.Schema({
   //add requirements


   firstname: {
     type:String,

     trim:true
   },

   lastname:{
     type:String,

     trim:true

   },

   email:{
     type :String,
     unique: true,
     required:true,

     trim:true
   },


   password:{
     type : String,
     require: true
   }



 });
 UsersSchema.plugin(timestamp);

 const Users = mongoose.model('Users',UsersSchema);
 module.exports = Users
