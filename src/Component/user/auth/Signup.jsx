import React, { useState} from "react";
import axios from "../../../Axios/axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../Redux/Reducers/Auth/singleReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
// import { sendSignInLinkToEmail } from "firebase/auth";
// import { auth} from "../../../firebase/config.js";


function Signup() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
  
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
 
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

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
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

   

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Invalid phone number format";
    }

    if (formData.password.length < 4) {
      errors.password = "Password must be at least 4 characters long";
    }
  
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {

      console.log(formData.email,"hggfhhhfhh");
      // Send email verification link
     
      // const email = formData.email
    
      // const actionCodeSettings = {
      //   url: "http://localhost:3000", // Replace with your actual URL
      //   handleCodeInApp: true,
      // };
   
      //   const response = await sendSignInLinkToEmail(auth, email, actionCodeSettings);
   
            axios.post("/api/signup", formData).then((response) => {
              console.log("vannnnnnnnnnnnn");
              if (response?.data?.token?.status === true) {
                localStorage.setItem("userAccessToken", response?.data?.token?.userData?.token);
              
                dispatch(setUserDetails({ payload: response?.data?.token?.userData}));
                toast.success("Registration successful!");
                navigate("/");
              } else {
                if (response.data.token.message === "Username,Email & Phonenumber Allready Exist") {
                  toast.warn("Username,Email & Phonenumber Allready Exist!");
                } else if (response.data.token.message === "Email & Phonenumber Allready Exist") {
                  console.log(response);
                  toast.warn("Email & Phonenumber Allready Exist !");
                }  else if (response.data.token.message === "Username & Email Allready Exist") {
                  console.log(response);
                  toast.warn("Username & Email Allready Exist!");
                }else if (response.data.token.message === "Username & Phone Allready Exist") {
                  console.log(response);
                  toast.warn("Username & Phone Allready Exist!");
                }else if (response.data.token.message === "Username Allready Exist") {
                  console.log(response);
                  toast.warn("Username Allready Exist!");
                }else if (response.data.token.message === "Email Allready Exist") {
                  console.log(response);
                  toast.warn("Email Allready Exist!");
                }
                else {
                  toast.warn("Phone number already exists!");
                }
              }
            });
          }
        };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#030712]">
    <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-md w-full text-white">
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl font-semibold">Signup</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
            />
            {formErrors.username && (
              <p className="text-red-500">{formErrors.username}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="text-gray-300">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
            />
            {formErrors.email && (
              <p className="text-red-500">{formErrors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="text-gray-300">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
            />
            {formErrors.phone && (
              <p className="text-red-500">{formErrors.phone}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
            />
            {formErrors.password && (
              <p className="text-red-500">{formErrors.password}</p>
            )}
          </div>
        </div>
       
  
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-[#06b6d4] text-white p-2 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
          >
            Sign Up
          </button>
      
        </div> <div className="text-center">
          <p className="mt-2 text-sm text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
  
  );
}

export default Signup;
