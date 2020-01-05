import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SignUp from  './Components/SignUp'
import Content from './Components/Content'
import UserData from './Components/UserData'

import {
  BrowserRouter as Router,
  Route,
  Link,

} from 'react-router-dom'

import {getFromStorage, setInStorage} from './Components/helperFunction'

export default class Auth extends React.Component {
  constructor(props){
    super(props);
    this.state = {

      token:'',
      user :{
        email:"",
        password: ""
      },
    };
  }

  componentDidMount(){


    if(this.state.token){


          const obj = getFromStorage('the_main_app');
      fetch("/verify?token=" + obj)
      .then(res => res.json())
      .then(json =>{
          if(json.success){
            this.setState({
              token : true

            })
          }
          else{
            this.setState({
              token: false

            })
          }
          console.log(this.state.token);
      });

    }
  }

  handleChange = name =>({target :{value}})=>{
    this.setState({
      user:{
        ...this.state.user,
        [name] : value
      }
    })
  }

  logOut = ()=>{
      let toDel = getFromStorage("the_main_app");
      fetch("/logout?token=" + toDel.token)
      .then(res => res.json())
      .then(json =>{
          console.log(json);
      });

    localStorage.clear();
    this.setState({
      token : ''
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
      if(res.status === 200){
        this.setState({

          token : true
        })

      }
      return res.json();
    }).then(function(json){
        if(json.success){
      setInStorage('the_main_app',{ token:json.token});
        }
      console.log(json.token);

    }).catch(err=>err);




  }




render(){
  const{token} = this.state
  const {user : {email, password}} = this.state

  if(getFromStorage('the_main_app')){
    return <div>
        <Button onClick = {this.logOut}> Log Out </Button>
        <UserData />
        <Content />


        </div>
  }

  if(!token){
    return (<div>

            <Router>
            <Link to="/SignUp" >Sign Up</Link>
            <Route path = "/SignUp" component = {SignUp} />
            <div> </div>
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

            </Router>


            </div>)
  }
  if(token){
    return <div>
        <Button onClick = {this.logOut}> Log Out </Button>
        <UserData />
        <Content />


        </div>
  }



return  <div>
    <Button onClick = {this.logOut}> Log Out </Button>
    <Content />

    </div>
}

}
