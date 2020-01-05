import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Content from './Content'
import { Redirect, Route } from 'react-router-dom'
import {setInStorage} from './helperFunction'

export default class LogIn extends React.Component {

  state = {
      user :{
        email:"",
        password: ""
      },
      redirect : false,
      token : "",
  }

handleChange = name =>({target :{value}})=>{
  this.setState({
    user:{
      ...this.state.user,
      [name] : value
    }
  })
}


  onSubmit = () =>{
    const {user} = this.state

    fetch('/login',{
      method : 'POST',
      body : JSON.stringify(user),
      headers :{
        'Content-Type' : 'application/json'
      }
    }).then(res=>{
      if(res.status == 200){
        this.setState({
          redirect : !this.state.redirect,
        })

      }
      return res.json();
    }).then(function(json){
        if(json.success){
          setInStorage('the_main_app',{ token:json.token});
          this.setState({
            token:json.token
          })
        }
      console.log(json.token);

    }).catch(err=>err);




  }

  render(){
    const {user : {email, password}} = this.state



    return(
      <div>
      <TextField label ="Email"
      value = {email}
      onChange = {this.handleChange('email')}/>
      <TextField label ="Password"
      value = {password}
      type = "password"
      onChange = {this.handleChange('password')}/>
      <div> </div>
      <Button onClick = {this.onSubmit}> Log in</Button>
      </div>

    )
  }
}
