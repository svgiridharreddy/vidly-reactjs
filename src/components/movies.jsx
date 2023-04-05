import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {getMovies, deleteMovie} from '../services/movieService';
import {getGenres} from '../services/genreService';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import SearchBox from './common/searchBox';
import {paginate} from './utils/paginate';
import _ from 'lodash';

class Movies extends Component {
  state = {
     movies: [],
     genre: [],
     pageSize: 4,
     currentPage: 1,
     searchQuery: "",
     selectedGenre: null,
     sortColumn: {path: 'title',order: 'asc'}
    } 
    
  async componentDidMount(){
    const {data: genres} = await getGenres();
    const {data: movies} = await getMovies();
    const genre = [{_id: '', name: 'All Genre'}, ...genres]
    this.setState({movies,genre})
  }

  handleDelete = async m => {
    let originalMovies = this.state.movies
    let movies = originalMovies.filter(movie => movie._id !== m._id )
    this.setState({movies})
    try {
      await deleteMovie(m._id)
    } catch (error) {
      if(error.respsone && error.response.status === 404)
        toast.error("This movie has already deleted!")
      this.setState({movies: originalMovies});
    }
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies]
    const index = movies.indexOf(movie)
    movies[index] = {...movies[index]}
    movies[index].liked = !movies[index].liked
    this.setState({movies});
  }

  handlePageChange = (page) => {
    this.setState({currentPage: page})
  }

  handleGenreSelect = (genre) => {
    this.setState({selectedGenre: genre, searchQuery: "", currentPage: 1})
  }

  handleSearch  = query => {
    this.setState({searchQuery: query, selectedGenre: null, currentPage: 1})
  }

  handleSort = (sortColumn) => {
    this.setState({sortColumn})
  }

  getPageData = () => {
    const {selectedGenre, sortColumn, currentPage, pageSize, movies: allMovies, searchQuery}  = this.state
    let filteredMovies = allMovies;
    if(searchQuery){
      filteredMovies = allMovies.filter(m=> m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
    }else{
      filteredMovies = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === this.state.selectedGenre._id ): allMovies ;
    }
    const sorted = _.orderBy(filteredMovies,[sortColumn.path],[sortColumn.order])
    let movies = paginate(sorted, currentPage, pageSize)
    return {totalCount: filteredMovies.length, data: movies}
  }

  render() { 
    const {length: count} = this.state.movies;
    const {pageSize, currentPage, sortColumn, movies: allMovies, genre, selectedGenre, searchQuery} = this.state;
    const {user} = this.props;
    const {totalCount, data: movies} = this.getPageData()
    if (count === 0) 
      return <p>No Movies in the list</p>

    return (
      <React.Fragment>
      <div className='row'>
        <div className='col-2'>
           <ListGroup items={genre} selectedItem={selectedGenre} onItemSelect={this.handleGenreSelect}/>
        </div>
        <div className='col'>
          {user && (<Link to="/movies/new"><button className="btn btn-primary">New Movie</button></Link>)}
          <p>Showing {totalCount} Movies list</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable 
            movies={movies} 
            sortColumn={sortColumn}
            onMovieLiked={this.handleLike}
            onMovieDelete={this.handleDelete} 
            onSort={this.handleSort}
           />
          <Pagination 
            itemsCount={totalCount} 
            pageSize={pageSize} 
            currentPage={currentPage}
            handlePageChange={this.handlePageChange} 
          />
        </div>
      </div>
      </React.Fragment>
    );
  }
}
 
export default Movies;