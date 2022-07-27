import './App.css';
import React, {Component} from 'react';
import { Route,Switch,Redirect} from 'react-router-dom';
import Movies from './components/movies';
import MovieForm from './components/movieForm';
import Navbar from './components/common/navbar';
import Rentals from './components/rentals';
import Customers from './components/customers';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import NotFound from './components/common/notFound';
class App extends Component {
  render() { 
    return (
      <React.Fragment>
        <Navbar /> 
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}/>
            <Route path="/register" component={RegisterForm}/>
            <Route path="/movies/:id" render={(props) => <MovieForm {...props} />}/>
            <Route path="/movies" component={Movies}></Route>
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
