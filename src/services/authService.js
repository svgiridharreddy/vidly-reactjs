import jwtDecode from "jwt-decode";
import http from "./httpService";
import config from '../config.json';

const apiEndPoint = config.apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email,password){
  const {data: jwt} = await http.post(apiEndPoint,{ email, password })
  loginWithJwt(jwt);
}

export function loginWithJwt(jwt){
  localStorage.setItem(tokenKey, jwt)
}

export function getCurrentUser(){
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function logout(){
  localStorage.removeItem(tokenKey);
}

export function getJwt(){
  return localStorage.getItem(tokenKey);
}


export default {
  login,
  loginWithJwt,
  getCurrentUser,
  logout,
  getJwt

}