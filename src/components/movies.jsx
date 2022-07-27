import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {getMovies} from '../services/fakeMovieService';
import {getGenres} from '../services/fakeGenreService';
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
    
  componentDidMount(){
    const genre = [{_id: '', name: 'All Genre'}, ...getGenres()]
    this.setState({movies: getMovies(),genre})
  }

  handleDelete = (m) => {
    let {movies} = this.state
    let remaingMovies = movies.filter(movie => movie._id !== m._id )
    this.setState({movies: remaingMovies })
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
    const {pageSize, currentPage, sortColumn, movies: allMovies, genre,selectedGenre, searchQuery} = this.state;
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
          <Link to="/movies/new"><button className="btn btn-primary">New Movie</button></Link>
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