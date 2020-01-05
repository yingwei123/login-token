import React from 'react'
import Button from '@material-ui/core/Button'
import {getFromStorage} from './helperFunction'
export default class UserData extends React.Component{

state= {
    firstname : "First Name",
    lastname :"Last Name",
    email :"Email",
    flip :false,

}

onSubmit = () =>{
  let token = getFromStorage("the_main_app");

    fetch("/data?token=" + token.token)
    .then(res => res.json())
    .then(json =>{
      if(json !== undefined){
        this.setState({
          firstname : json.firstname,
          lastname : json.lastname,
          email : json.email,
          flip :!this.state.flip

        })
      }

  });
}


  render(){


      let {firstname , lastname, email} = this.state
      return(
        <div>
        <Button onClick = {this.onSubmit}> Get User Data! </Button>
        <p>{firstname} </p> <p>{lastname} </p><p> {email} </p>
         </div>
      )



  }
}
