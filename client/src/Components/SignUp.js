import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/Textfield'
import { Redirect } from 'react-router-dom'

export default class SignUp extends React.Component{

  state = {
      user :{
        firstname : "",
        lastname :"",
        email:"",
        password: ""
      },
      redirect : false,

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

    fetch('/signup',{
      method : 'POST',
      body : JSON.stringify(user),
      headers :{
        'Content-Type' : 'application/json'
      }
    }).then(res=>{
      if(res.status === 200){
        this.setState({
          redirect : !this.state.redirect
        })
      }
      return res.json();
    }).then(function(json){
      let data = JSON.stringify(json);
      console.log(data);
    }).catch(err=>err);
  }

  render(){
    const {user : {firstname, lastname,email, password}} = this.state


    if(this.state.redirect === true){
      return <Redirect to = '/login' />
    }
    return(
      <div>
      <TextField label ="FirstName"
      value = {firstname}
      onChange = {this.handleChange('firstname')}/>
      <div> </div>
      <TextField label ="LastName"
      value = {lastname}
      onChange = {this.handleChange('lastname')}/>
      <div> </div>
      <TextField label ="Email"
      value = {email}
      onChange = {this.handleChange('email')}/>
      <div> </div>
      <TextField label ="Password"
      value = {password}
      type = "password"
      onChange = {this.handleChange('password')}/>
      <div> </div>
      <div> </div>
      <Button onClick = {this.onSubmit}> Sign Up</Button>
      </div>

    )
  }
}
