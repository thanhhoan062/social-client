import axios from 'axios';
import TokenService from './token.service';
import { API_AUTH_URL } from '../constants';

const register = (name, username, email, password) => {
  return axios.post(API_AUTH_URL + 'signup', {
    name,
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_AUTH_URL + 'signin-refresh', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return TokenService.getUser();
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default AuthService;
