import React, { useEffect, useRef, useState} from "react";
import axios from "../../Axios/axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../Redux/Reducers/singleReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth} from "../../firebase/config.js";
import { RecaptchaVerifier } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";


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

  const [otpInputForm, setOtpInpuForm] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);

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
  function onCaptchaVerify(){
   console.log("cpachayil vannu");
   if(!window.recaptchaVerifier ){
      console.log("window capchaillaaaa");
    
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

  const sentOtp = async() => {
    console.log("otp functionil vannu");
    onCaptchaVerify()

     const appVerifier = window.recaptchaVerifier;
     console.log(appVerifier,"appverifierr");
     const ph = '+91' + formData.phone;
     console.log(ph);
     signInWithPhoneNumber(auth, ph, appVerifier)
       .then((confirmationResult) => {
         window.confirmationResult = confirmationResult;
         toast.success("OTP sent to your Number");
         setOtpInpuForm(true)
         setOtpSent(true); // OTP is sent
         startOtpTimer()// Start the OTP timer
         setShowResendButton(false);
         setOtpExpired(false);
       })
       .catch((error) => {
         console.log(error);
       });
   
  
   };

   useEffect(() => {
    let timerId;

    if (otpSent && otpTimer > 0) {
      timerId = setInterval(() => {
        setOtpTimer((prevTimer) => prevTimer - 1);

        if (otpTimer <= 0) {
          clearInterval(timerId);
          handleOtpTimerExpiration();
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [otpSent, otpTimer]);

   const startOtpTimer = () => {
    const otpExpiryTime = 60; // OTP validity period in seconds
    setOtpTimer(otpExpiryTime);
  
    let timerId = setInterval(() => {
      setOtpTimer((prevTimer) => prevTimer - 1);
  
      if (otpTimer <= 0) {
        clearInterval(timerId);
        handleOtpTimerExpiration();
      }
    }, 60000);
  };

  const handleOtpTimerExpiration = () => {
    console.log("Timer expiredddddddddd");
    setOtpSent(false);
    setOtpTimer(0);
    setOtpExpired(true); // Set otpExpired to true when the timer expires
    setShowResendButton(true); // Show "Resend OTP" button
  };

  function verifyOtp() {
    const enteredOtp = otp.join('');
    window.confirmationResult.confirm(enteredOtp)
      .then(async (res) => {
        registerUser()
      })
      .catch((error) => {
        if (error.code === "auth/invalid-verification-code") {
          toast.error("Invalid OTP. Please try again.");
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      
      });
  }

  const resendOtp = () => {
    sentOtp();
    setOtpExpired(false); // Reset the OTP expiration flag
    setShowResendButton(false);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    } else {
      // Regular expression to allow letters (uppercase and lowercase), numbers, and underscores
      const usernameRegex = /^[a-zA-Z0-9_]{1,15}$/;
  
      if (!usernameRegex.test(formData.username)) {
        errors.username = "Please enter a valid Username";
      }
  
      if (/\s/.test(formData.username)) {
        errors.username = "not accept spaces.";
      }
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

      await axios.post('/checkExistingData', formData).then((response)=>{
        if (response?.data?.status === true) {
         sentOtp()

        } else {
              toast.error(response.data.message);
            
            }
      })

          }
        };

        const registerUser=()=>{

       
        axios.post("/signup", formData).then((response) => {
             
          if (response?.data?.token?.status === true) {
            localStorage.setItem("userAccessToken", response?.data?.token?.userData?.token);
          
            dispatch(setUserDetails({ payload: response?.data?.token?.userData}));
            toast.success("Registration successful!");
            navigate("/");
          } else{
            toast.error(response.data.token.message);
          }
        });
      }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#030712]">
    <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-md w-full text-white">
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl font-semibold">Signup</h2>
      </div>
      {!otpInputForm && (
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
              maxLength="15"
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
 )}
      <div id="recaptcha-container" className="mb-5"></div>

      {otpInputForm && (
       
        <div className="flex justify-between items-center">

                {otp.map((value, index) => (
          <input
            key={index}
            className="w-12 h-12 text-black text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
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
          <div>{otpSent && !otpExpired && <p className="text-center text-white">OTP expires in {otpTimer} seconds</p>}</div>
      {otpExpired && showResendButton && (
        <p className="text-center text-red-500">
          OTP has expired.{" "}
          <button onClick={resendOtp} className="text-blue-500 underline">
            Resend OTP
          </button>
        </p>
      )}
    </div>
  </div>
 
  );
}

export default Signup;
