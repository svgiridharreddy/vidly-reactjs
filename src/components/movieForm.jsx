import React from 'react';
import Joi from 'joi-browser';
import {getMovie,saveMovie} from '../services/fakeMovieService';
import {getGenres} from '../services/fakeGenreService';
import Form from './common/form';


class MovieForm extends Form {
  state = { 
      data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
   } 
  
  schema = {
    _id:  Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).max(100).required().label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Daily Rental Rate")
  }
  
  componentDidMount(){
    const genres = getGenres();
    this.setState({genres})
    const movieId =this.props.match.params.id
    if(movieId === "new") return;
    const movie = getMovie(movieId)
    if(!movie) return this.props.history.replace("/not-found")
    this.setState({data: this.mapToViewModel(movie)})
  }
  
  mapToViewModel(movie){
    return {
      _id: movie._id,
      title: movie.title,
      genereId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  }

  doSubmit = () => {
    saveMovie(this.state.data)
    this.props.history.push("/movies")
  }

  render() { 
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Movie form {this.props.match.params.id}</h1>
        {this.renderInput("title","Title")}
        {this.renderSelect("genreId","Genre",this.state.genres)}
        {this.renderInput("numberInStock","Number in Stock")}
        {this.renderInput("dailyRentalRate","Rate")}
        {this.renderButton("Save")}
      </form>
    );
  }
}
 
export default MovieForm;



// const MovieForm = ({match,history}) => {
//   const handleSave = () => {
//     history.push("/movies")
//   }
//   return ( 
    
//    );
// }
 
// export default MovieForm;