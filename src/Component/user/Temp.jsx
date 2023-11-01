import React, { useState, useEffect } from "react";
// ... other imports

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // ... other states

  const [otpTimer, setOtpTimer] = useState(0);

  // Function to start the OTP timer
  const startOtpTimer = () => {
    const otpExpiryTime = 60; // OTP validity period in seconds
    setOtpTimer(otpExpiryTime);
    const interval = setInterval(() => {
      if (otpTimer > 0) {
        setOtpTimer(otpTimer - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  // Function to resend OTP
  const resendOtp = () => {
    // Add your logic to resend OTP here
    // You can call the sentOtp function again to resend OTP
    sentOtp();
    startOtpTimer(); // Start the timer again after resending OTP
  };

  // ... other functions

  useEffect(() => {
    // ... other code

    if (otpInputForm) {
      if (otpTimer === 0) {
        // OTP timer has expired, you can handle it here
        // For example, display a message or allow the user to resend OTP
      }
    }
  }, [otpInputForm, otpTimer]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-md">
        {/* ... other code */}
        {otpInputForm && (
          <div>
            <div className="flex justify-between items-center">
              {otp.map((value, index) => (
                <input
                  key={index}
                  // ... other attributes
                />
              )}
              <button
                className={`bg-teal-500 text-white font-bold py-2 px-4 rounded focus-outline-none focus-shadow-outline ${
                  otp.some((value) => value === "")
                    ? "disabled-button"
                    : "hover-enabled-button"
                }`}
                type="button"
                onClick={verifyOtp}
                disabled={otp.some((value) === "")}
              >
                Verify
              </button>
            </div>
            {otpTimer > 0 ? (
              <p className="text-center text-white">
                OTP expires in {otpTimer} seconds
              </p>
            ) : (
              <p className="text-center text-red-500">
                OTP has expired.{" "}
                <button
                  onClick={resendOtp}
                  className="text-blue-500 underline"
                >
                  Resend OTP
                </button>
              </p>
            )}
          </div>
        )}
        {/* ... other code */}
      </div>
    </div>
  );
}

export default Login;
