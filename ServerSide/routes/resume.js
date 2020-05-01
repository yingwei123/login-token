
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Resumes = require('../models/Resume');
const Users = require('../models/Users');
const UserSessions = require('../models/UserSession');

module.exports = app => {

app.get('/resume', async (req,res) =>{

  try{
    const resumes = await Resumes.find({});

    res.send(resumes);
    res.send(200);
  }
  catch(err){
    res.sendStatus(400);
  }

});

app.post('/resume', async (req, res)=>{
  const{ query } = req;
  const{ token } = query;

try{

  const session = UserSessions.findOne({_id : token});
  const userId = session.userId;
  const user = Users.findOne({_id : userId});



  res.sendStatus(200);
}
catch(err){
  res.sendStatus(400);
}


});




}
