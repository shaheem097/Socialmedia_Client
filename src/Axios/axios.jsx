import axios from 'axios';
import { logoutUser } from '../Redux/Reducers/singleReducer';
import { logoutAdmin } from '../Redux/Reducers/adminAuthReducer';
import { store } from '../Redux/store';

const axiosInterceptorInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    const adminAccessToken = localStorage.getItem("adminAccessToken");

    const userAccessToken = localStorage.getItem("userAccessToken");

    
    if (config.url.startsWith('/admin') && adminAccessToken) {
      config.headers.Authorization = adminAccessToken;
      
    } else if (userAccessToken) {
   
      config.headers.Authorization = userAccessToken;
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
    console.log(error.response?.data?.message,"messagesssssssssssssssss");
    if (error.response && error.response.status === 401 &&error.response?.data?.message==='userTokenNotverify') {

         console.log("userssssssssssssssss");
   
      store.dispatch(logoutUser());
 
      window.location.href = '/login';
    }else if(error.response && error.response.status === 401 &&error.response?.data?.message==='adminTokenNotverify'){
      
      console.log("adminnnnnnnnnnnnn");
       
      store.dispatch(logoutAdmin());

      window.location.href = '/admin/login';

    }
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
