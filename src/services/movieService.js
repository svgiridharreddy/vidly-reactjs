import http from "./httpService";
import config from '../config.json';

const apiEndPoint = config.apiUrl + "/movies";

function movieUrl(id){
  return `${apiEndPoint}/${id}`;
}

export function getMovies(){
  return http.get(apiEndPoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if(movie._id){
    const body = {...movie}
    delete body._id 
    return http.put(movieUrl(movie._id), body)
  }
  return http.post(apiEndPoint,movie);
}


export function deleteMovie(movieId){
  console.log(`headers are :`);
  return http.delete(movieUrl(movieId));
}