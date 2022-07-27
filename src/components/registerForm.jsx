import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

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

  doSubmit = () => {
    console.log("Register submitted");
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