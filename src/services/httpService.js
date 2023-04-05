import axios from 'axios';

// import {toast} from 'react-toastify';
// import logger from './logService';

// axios.interceptors.response(null,error => {
//   const expectedError = error.response && error.response.code >=400 && error.response.code < 500
//   if(!expectedError){
//     toast("An unexpected error occured!");
//   }
//   return Promise.reject(error)
// })

export function setJwt(jwt){
  console.log("token is :",jwt);
  axios.defaults.headers.common['x-auth-token'] = jwt;
  console.log("headers is :",axios.defaults.headers.common);
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt
}