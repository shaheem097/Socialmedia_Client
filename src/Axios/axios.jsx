import axios from 'axios';
import {logoutUser} from '../Redux/Reducers/singleReducer'
import { store } from '../Redux/store';


const axiosInterceptorInstance = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

axiosInterceptorInstance.interceptors.request.use(
  (config) => {
        const accessToken = localStorage.getItem("userAccessToken");
 
    if (accessToken) {
      if (config.headers) config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {

    console.log("Error in request");
    
    return Promise.reject(error);
  }
);


axiosInterceptorInstance.interceptors.response.use(
  (response) => {

    return response;
  },
  (error) => {
    
    if (error.response && error.response.status === 401) {
      console.log("");
      // Unauthorized response, dispatch the logoutUser action
      store.dispatch(logoutUser());
      // Redirect to the login page (you should replace '/login' with your login page URL)
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
export default axiosInterceptorInstance;