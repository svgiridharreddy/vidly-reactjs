import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Like from './common/like';
import Table from './common/table';
import authService from '../services/authService';
class MoviesTable extends Component {
  

  columns = [
    {path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
    {path: 'genre.name', label: 'Genre'},
    {path: 'numberInStock', label: 'Stock'},
    {path: 'dailyRentalRate', label: 'Rate'},
    {key: "like", content:  movie => <Like liked={movie.liked} onMovieLiked={() => this.props.onMovieLiked(movie)} /> },
  ];
  
  deleteColumn = { key: "delete",content: movie => { <button className="btn btn-danger  btn-sm" onClick={() => this.props.onMovieDelete(movie)}>Delete</button> }}

  constructor(){
    super()
    const user = authService.getCurrentUser()
    console.log(user);
    if(user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() { 
    const {movies, onSort, sortColumn  } = this.props
    return(
      <React.Fragment>
        <Table 
        data={movies}
        onSort={onSort}
        columns={this.columns} 
        sortColumn={sortColumn} 
      />
      </React.Fragment>
     
    );
  }
}
 
export default MoviesTable;
