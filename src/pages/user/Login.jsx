import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Axios/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetails,setTokens } from "../../Redux/Reducers/singleReducer";
import {signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/config.js";
import { useEffect } from "react";
import OtpVerification from "../../Component/user/OtpVerification";


function Login() {


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

 

  const dispatch = useDispatch();
  
  const [otpForm, setOtpForm] = useState(false);



  const [value, setValue] = useState(null)
  const handleGoogleSignIn = async (e) => {
    signInWithPopup(auth, provider)
      .then(async (data) => {
        const email = data.user.email;
        const googleUser = {
          email,
        };
        setValue(googleUser);
      })
      .catch((error) => {
        if (error.code === 'auth/popup-closed-by-user') {
        
          console.log('Google Sign-In popup closed by the user');
        } else {
       
          console.error('Firebase Sign-In Error:', error);
        }
      });
  };
  
  const handleGoogleSignInEffect = (googleUser) => {
    if (googleUser) {

      axios.post("/google", googleUser,{withCredentials:true}).then((response) => {
    
        if (response.data.status) {
          localStorage.setItem("userAccessToken", response?.data?.token);
          
          dispatch(setUserDetails({ payload: response?.data?.userData }));
          dispatch(setTokens(response?.data?.token));
          toast.success("Google Login successful!");
          navigate("/");
        } else if(response.data.blocked){
          toast.error("User blocked by admin!");
        }
        else {
          toast.warn("Email Doesn't exist");
          setFormData(true);
        }
      });
    }
  };
  
  useEffect(() => {
    handleGoogleSignInEffect(value);
 
  }, [value]);

  


  const navigate = useNavigate();

  const handleChange = (e) => {const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };

  const validateForm = () => {const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else {
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Invalid email format";
      }
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
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
        .post("/login", formData,{withCredentials:true})

        .then((response) => {

          console.log("logindataaaaaaaaaa", response.data.userData);

          if (response?.data?.status === true) {

           console.log('hhhhhhhhhhhhhhhhhhhhhhhh');
            localStorage.setItem("userAccessToken", response?.data?.token);

            dispatch(setUserDetails({ payload: response?.data?.userData}));
            dispatch(setTokens(response?.data?.token));

         
            toast.success("Login  Success");
            navigate("/");
          } else if (response.data.blocked) {
          
            toast.error("User blocked by Admin");
           
          } else {
              toast.warn("Invalid Email or Password !");
          }
        })
        .catch((error) => {
          console.error("Error occurred while making the request:", error);
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
          Login
        </h2>
      </div>
      {!otpForm && (
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
            />
            {formErrors.email && (
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
            />
            {formErrors.password && (
              <p className="text-red-500">{formErrors.password}</p>
            )}
          </div>
{/*   
        
  
            <div className="text-sm">
              <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div> */}
  
          <div>
            <button
              type="submit"
              className="w-full bg-[#06b6d4] text-white p-3 rounded-lg mt-6 hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
            >
              Login
            </button>
            <div style={{ textAlign: "center" }}>
            <span style={{ fontWeight: "bold", color: "white" }}>OR</span>

            </div>
            <div className="flex pb-3 space-x-10">
  <button
    onClick={() => setOtpForm(true)}
    type="button"
    className="flex items-center justify-center flex-grow bg-[#f43f5e] hover:bg-blue-600 text-white cursor-pointer rounded-md p-2 h-10"
  >
    <span>Login using OTP</span>
   
  </button>

  <button
    onClick={handleGoogleSignIn}
    type="button"
    className="flex items-center justify-center  flex-grow bg-[#f43f5e] text-white p-2 rounded-md h-10 hover:bg-blue-600 focus:outline-none focus:ring focus:bg-red-600"  >
    Login with Google
  </button>
</div>

          </div>
        </form>
      )}
  
      {otpForm && (
     <OtpVerification/>
      )}
  


<div className="text-center mt-4">
  <p className="text-sm text-gray-600">
    {otpForm ? (
     <span>
     <a
       href="/login" // Provide the URL for the login page
       className="font-medium text-white hover:text-blue-500"
     >
       <span style={{ marginRight: "8px" }}>&#8592;</span> Login page
     </a>
   </span>
    ) : (
      <span>
      <span style={{ color: "white" }}>Don't have an account?</span>{" "}
      <a
        href="/signup" // Provide the URL for the signup page
        className="font-medium text-white hover:text-blue-500"
      >
        Sign up
      </a>
    </span>
    
    )}
  </p>
</div>

      </div>
    </div>
  );
}

export default Login;
