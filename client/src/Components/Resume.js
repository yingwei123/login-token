import React from  'react'
import TextField from '@material-ui/core/TextField'

export default class Resume extends React.Component{


  state = {
      resume :{
        firstname:"",
        lastname: "",
        email :"",
        phone : "",
        workExp : []
      },

  }

  render(){

    return(
      <div>
          <TextField
          label = " First Name"
          />

          <TextField
            label = "Last Name"

          />

          <TextField
          label = "Email"

          />

          <TextField
          label = "Phone"

          />

          </div>
    )
  }
}
