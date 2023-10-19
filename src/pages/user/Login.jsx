import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Axios/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../Redux/Reducers/Auth/singleReducer";
import { useRef } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/config.js";
import { useEffect } from "react";


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
  const [otpInputForm, setOtpInpuForm] = useState(false);
  const [phone,setPhone]=useState("")
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  
  const handleOtpChange = (index, value) => {

    if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        inputRefs[index - 1].current.focus(); 
      }
    } else if (!isNaN(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) {
        inputRefs[index + 1].current.focus(); 
      }
    }
  };

const handleOtpNumber =(e)=>{
setPhone(e.target.value)
}

  function onCaptchaVerify(){
    if(!window.recaptchaVerifier ){
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        callback: (response) => {
      sentOtp()
        },
        'expired-callback': () => {
        
        }
      },auth);
    }
  }
  
  const checkPhoneExistence = async (phone) => {
  
    try {
      const response = await axios.post('/checkPhoneNumber', {
        phone,
      });
      if(response.data.status===true){
  return true
      } 
      else if(response.data.blocked===true){
        return {blocked:true}
      }
    } catch (error) {
      console.error(error);
      return false; 
    }
  };

  const sentOtp = async() => {
   onCaptchaVerify()


   const phoneExists = await checkPhoneExistence(phone);

   if (phoneExists&&!phoneExists.blocked) {
    const appVerifier = window.recaptchaVerifier;
    const ph = '+91' + phone;
    console.log(ph);
    signInWithPhoneNumber(auth, ph, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("OTP sent to your Number");
        setOtpInpuForm(true)
      })
      .catch((error) => {
        console.log(error);
      });
  } 
  else if(phoneExists.blocked){
    console.log("blocked by adminnnnnnnnnn");
    toast.error("User blocked by Admin");
  }
  else {
        toast.error("Phone number doesn't exist");
  }
  };
  
  function verifyOtp() {
    const enteredOtp = otp.join('');
    window.confirmationResult.confirm(enteredOtp)
      .then(async (res) => {
        axios.post("/otpLogin", { phone: phone })
          .then((response) => {
            console.log(response.data.status);
            
            if (response.data.status) {
              localStorage.setItem("userAccessToken", response?.data?.response?.userData?.token);
              dispatch(setUserDetails({ payload: response?.data?.response?.userData }));
              toast.success("OTP Login successful!");
              navigate("/");
            } else {
              toast.warn("Something Error");
              setFormData(true);
            }
          })
          .catch((error) => {
            if (error.code === "auth/invalid-verification-code") {
              toast.error("Invalid OTP. Please try again.");
            } else {
              toast.error("An error occurred. Please try again later.");
            }
            setFormData(true);
          });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-verification-code") {
          toast.error("Invalid OTP. Please try again.");
        } else {
          toast.error("An error occurred. Please try again later.");
        }
        setFormData(true);
      });
  }
  
  

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
      console.log(googleUser, "hgjhghghhhghgfhg");
      axios.post("/google", googleUser).then((response) => {
        console.log(response.data.blocked,"ssssssssssssssssssssss");
        if (response.data.status) {
          localStorage.setItem("userAccessToken", response?.data?.response?.userData?.token);
          dispatch(setUserDetails({ payload: response?.data?.response?.userData }));
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
        .post("/login", formData)
        .then((response) => {


          if (response?.data?.status === true) {
           
            localStorage.setItem("userAccessToken", response.data.user.userData.token);
            dispatch(setUserDetails({ payload: response.data.user.userData }));
            toast.success("Login Success");
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
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
        
        <div>
          
        <div>
            <label htmlFor="phoneNumber" className="text-gray-300">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={phone}
              onChange={handleOtpNumber}
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
              placeholder="Phone Number"
            />
            <div style={{ height: "20px" }}></div>
          </div>
          <div>
            <button
              onClick={sentOtp}
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 mb-7 border border-transparent text-sm font-medium rounded-md text-white bg-[#030712] hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#030712]"
            >
              Send OTP
            </button>
          </div>

         <div id="recaptcha-container" className="mb-5"></div>


         {otpInputForm && (
  <div className="flex justify-between items-center">
         
    
          {otp.map((value, index) => (
    <input
      key={index}
      className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
      type="text"
      maxLength="1"
      pattern="[0-9]"
      inputMode="numeric"
      autoComplete="one-time-code"
      required
      value={value}
      onChange={(e) => handleOtpChange(index, e.target.value)}
      ref={inputRefs[index]}
    />
  ))}<button
  className={`bg-teal-500 text-white font-bold py-2 px-4 rounded focus-outline-none focus-shadow-outline ${
    otp.some(value => value === '') ? 'disabled-button' : 'hover-enabled-button'
  }`}
  type="button"
  onClick={verifyOtp}
  disabled={otp.some(value => value === '')}
>
  Verify
</button>



          </div>
)}

       
        </div>
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
