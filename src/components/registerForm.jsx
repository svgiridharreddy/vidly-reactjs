import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import user from "../services/userService";
import auth from "../services/authService";
class RegisterForm extends Form {
  state = {
    data: {username: "",
           password: "",
           name: ""
    },
    errors: {}
  } 

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().min(5).max(10).required().label("Password"),
    name: Joi.string().required().label("Name")
  }

  doSubmit = async () => {
    try {
      const response = await user.register(this.state.data)
      auth.loginWithJwt(response.headers["x-auth-token"])
      window.location = "/";
    }
    catch (error) {
      if(error.response && error.response.status === 400){
        const errors = {...this.state.errors}
        errors.username = error.response.data;
        this.setState({errors})
      }    
    }
  }

  render() { 
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("username", "Username","email")}
        {this.renderInput("password", "Password","password")}
        {this.renderInput("name", "Name")}
        {this.renderButton("Register")}
      </form>
    );
  }
}
 
export default RegisterForm;