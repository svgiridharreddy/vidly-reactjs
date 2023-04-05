import './App.css';
import React, {Component} from 'react';
import { Route,Switch,Redirect} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './components/movies';
import MovieForm from './components/movieForm';
import Navbar from './components/common/navbar';
import Rentals from './components/rentals';
import Customers from './components/customers';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import RegisterForm from './components/registerForm';
import NotFound from './components/common/notFound';
import ProtectedRoute from './components/common/protectedRoute';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  
  state = {}
  
  componentDidMount() {
    const user = auth.getCurrentUser()
    this.setState({user})
  }
  

  render() { 
    const {user} = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} /> 
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/register" component={RegisterForm}/>
            <ProtectedRoute path="/movies/:id" component={MovieForm}/>
            <Route path="/movies" render={props => <Movies {...props} user={user}/>}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" to="/movies" exact />
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
 
export default App;
