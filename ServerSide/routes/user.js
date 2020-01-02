const Users = require('../models/Users');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

module.exports = app => {

app.get('/user', async (req,res) =>{

  try{
    const users = await Users.find({});
    res.send(users);
  }
  catch(err){
    res.send(400);
  }

});

}
