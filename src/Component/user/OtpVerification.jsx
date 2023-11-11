import React, { useRef, useState ,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "../../Axios/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth} from "../../firebase/config.js";
import { RecaptchaVerifier } from "firebase/auth";
import { setUserDetails,setTokens } from "../../Redux/Reducers/singleReducer";




function OtpVerification() {

    

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [otpInputForm, setOtpInpuForm] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
    const [otpTimer, setOtpTimer] = useState(0);
    const [otpSent, setOtpSent] = useState(false);
    const [otpExpired, setOtpExpired] = useState(false);
    const [showResendButton, setShowResendButton] = useState(false);
    const [phone,setPhone]=useState("")

    
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
      console.log(response.data,"dataphon");
      if(response.data.status===true){
      
  return true
      } 
      else if(response.data.blocked===true){
        return {blocked:true}
      }
      else if(response.data.status===false){
       
        return false
      }
      
    } catch (error) {
      console.error(error);
      return false; 
    }
  };
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

  const handleOtpNumber =(e)=>{
    setPhone(e.target.value)
    }

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
        setOtpSent(true); // OTP is sent
        startOtpTimer()// Start the OTP timer
        setShowResendButton(false);
        setOtpExpired(false);
      })
      .catch((error) => {
        console.log(error);
      });
  } 
  else if(phoneExists.blocked){
 
    toast.error("User blocked by Admin");
  }
  else {
        toast.error("Phone number doesn't exist");
  }
  };

  const handleOtpTimerExpiration = () => {
    console.log("Timer expiredddddddddd");
    setOtpSent(false);
    setOtpTimer(0);
    setOtpExpired(true); // Set otpExpired to true when the timer expires
    setShowResendButton(true); // Show "Resend OTP" button
  };
  
  useEffect(() => {
    let timerId;

    if (otpSent && otpTimer > 0) {
      // Set up a timer to decrement the timer value every second
      timerId = setInterval(() => {
        setOtpTimer((prevTimer) => prevTimer - 1);

        if (otpTimer <= 0) {
          clearInterval(timerId);
          handleOtpTimerExpiration();
        }
      }, 1000);
    }

    // Clean up the timer when the component unmounts or when the OTP is verified
    return () => {
      clearInterval(timerId);
    };
  }, [otpSent, otpTimer]);


  
  const resendOtp = () => {
    // Add your logic to resend OTP here
    // You can call the sentOtp function again to resend OTP
    sentOtp();
    setOtpExpired(false); // Reset the OTP expiration flag
    setShowResendButton(false);
   
  };
 
  

  function verifyOtp() {
    const enteredOtp = otp.join('');
    window.confirmationResult.confirm(enteredOtp)
      .then(async (res) => {
        axios.post("/otpLogin", { phone: phone },{withCredentials:true})
          .then((response) => {
            if (response.data.status) {
              localStorage.setItem("userAccessToken", response?.data?.token);
              dispatch(setUserDetails({ payload: response?.data?.userData }));
              dispatch(setTokens(response?.data?.token));
              toast.success("OTP Login successful!");
              navigate("/");
            } else {
              toast.warn("Something Error");
              
            }
          })
          .catch((error) => {
            if (error.code === "auth/invalid-verification-code") {
              toast.error("Invalid OTP. Please try again.");
            } else {
              toast.error("An error occurred. Please try again later.");
            }
   
          });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-verification-code") {
          toast.error("Invalid OTP. Please try again.");
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      
      });
  }
  
  


  return (
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
          disabled={otpSent} // Disable the button if OTP has already been sent
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
  )
}

export default OtpVerification
