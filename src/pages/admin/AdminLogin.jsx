import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { useDispatch} from "react-redux";
import axios from '../../Axios/axios';
import { toast } from 'react-toastify';
import { setAdmin } from '../../Redux/Reducers/Auth/adminAuthReducer';


function AdminLogin() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
      const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
      });
    
      // const auth=useSelector((state)=>state.admin.payload)

      // useEffect(() => {
      //   if(auth){
      //    navigate('/admin')
      //   }
    
      // },[])
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    


  
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    };
      const validateForm = () => {
        const errors = {};
    
        if (!formData.email.trim()) {
          errors.email = 'Email is required';
        } else {
          // Check for a valid email format using a regular expression
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData.email)) {
            errors.email = 'Invalid email format';
          }
        }
    
        if (!formData.password.trim()) {
          errors.password = 'Password is required';
        }
    
        return errors;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validate the form
        const errors = validateForm();
    
        if (Object.keys(errors).length === 0) {
          // Send user input data to the backend using Axios
          axios
            .post('/api/admin/login', formData)
            .then((response) => {
              if (response?.data?.status === true) {
                localStorage.setItem("adminAccessToken", response.data.data.token);
          
               dispatch(setAdmin({payload:response.data.data.token}))
                toast.success('Login successful!');
                navigate('/admin');
              }
              else {
                setFormErrors({
                  ...formErrors,
                  general: "Invalid Email or Password", // Set a general error message
                });
                toast.warn('Invalid Email or Password');
              }
            })
            .catch((error) => {
              console.error('Error occurred while making the request:', error);
            });
        } else {
          setFormErrors(errors);
        }
      };
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-md">
     <div>
     <h2 className="text-center text-3xl font-extrabold text-white mb-4">
Admin Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
            /> {formErrors.email && (
              <p className="text-red-500">{formErrors.email}</p>
            )}
          </div>
          <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
            /> {formErrors.password && (
              <p className="text-red-500">{formErrors.password}</p>



              
            )}
          </div>

        

          <div>
          <button
              type="submit"
              className="w-full bg-[#06b6d4] text-white p-3 rounded-lg mt-6 hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
       
      </div>
    </div>
  );
}

export default AdminLogin
