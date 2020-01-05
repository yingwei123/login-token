const Users = require('../models/Users');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSession = require('../models/UserSession');

module.exports = app => {

app.get('/user', async (req,res) =>{

  try{
    const users = await Users.find({});

    res.send(users);
    res.send(200);
  }
  catch(err){
    res.sendStatus(400);
  }

});

app.post('/signup', async (req, res)=>{

try{


const firstname = req.body.firstname;
const lastname = req.body.lastname;
const email = req.body.email;
const password = req.body.password;

  const newUser = new Users();
  newUser.firstname = firstname;
  newUser.lastname = lastname;
  newUser.password =  bcrypt.hashSync(password,14);
  newUser.email = email;
  const user = await newUser.save();


  res.sendStatus(200);
}
catch(err){
  res.sendStatus(400);
}


});

app.post('/login', async(req,res) =>{
  try{
    Users.findOne({email : req.body.email}, (err,user)=>{
      if(err || !user || !bcrypt.compareSync(req.body.password, user.password) ){
          res.sendStatus(400);
      }

      if(req.body.email == user.email && bcrypt.compareSync(req.body.password, user.password)){

        let userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err,doc) =>{
          if(err){
            return res.send({
              success : false,
              message: 'Error : Server Error'
            });
          }
          return res.send({
            success: true,
            message: "Valud Sign in",
            token : doc._id
          });
        })





      }


    });
  }
  catch(err){
    res.send(400);
  }


})

app.get('/verify', async(req,res) =>{
  const{ query } = req;
  const{ token } = query;

  try{
    UserSession.find({
      _id : token, isDeleted: false
    }, (err, sessions) =>{
      if(err){
        return res.send({
          success : false,
          message : 'Error : Server Error'
        })
      }

      return res.send({
        success : true,
        message : 'Good'
      })
    })
  }
  catch(err){
    res.send({
      success: false,
      message : 'Error : Server Error'
    })
  }



})

app.get('/logout', async(req,res) =>{
  const {query} = req;
  const{ token } = query;
  try{
    UserSession.findOneAndUpdate({
      _id : token, isDeleted: false
    },
      {$set:{isDeleted: true}}
    ,null,(err, sessions) =>{
      if(err){
        return res.send({
          success : false,
          message : 'Error : Server Error'
        })
      }

      return res.send({
        success : true,
        message : 'Good'
      })
    })
  }
  catch(err){
    res.send({
        success: false,
        message: 'Error : Server Error'
      })
  }



})

app.get('/sessions', async(req,res) =>{
  try{
    const token = await UserSession.find({});

    res.send(token);
    res.send({
      success : true,
      message : 'Good'
    });

  }
  catch(err){
    res.send({
      success : false,
      message: 'Error : Server Error'
    })
  }

})

app.get('/data', async(req,res) =>{
  const {query} = req;
  const{ token } = query;

  try{
    const session = await UserSession.findOne({_id : token});
    if(session.isDeleted){
      res.end({
        message: "Error : Session is Over"
      })
    }
    const userID = session.userId;

    const user = await Users.findOne({_id:userID});

    res.send(user);
    re.send(200);


  }
  catch(err){
    res.send({
      message: "System Error"
    })
  }


})



}
