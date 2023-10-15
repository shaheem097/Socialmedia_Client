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
