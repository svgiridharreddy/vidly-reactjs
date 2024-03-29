import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import authService from '../services/authService';
import { Redirect } from 'react-router-dom';

class LoginForm extends Form { 
  state = {
    data: { 
      username: "",
      password: ""
    },
    errors: {}
  }

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password")
  }

  doSubmit = async () => {
    try {
      const {data} = this.state
      await authService.login(data.username, data.password);
      const {state} = this.props.location
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      const errors = {...this.state.errors}
      if(ex.response && ex.response.status === 400) {
        errors.username = ex.response.data;
        this.setState({errors})
      }
    }
  }

  render() { 
    if (authService.getCurrentUser()) return <Redirect to="/" />;
    
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("username", "Username") }
        {this.renderInput("password", "Password","password") }
        {this.renderButton("Login")}
      </form>
    );
  }
}
 
export default LoginForm;