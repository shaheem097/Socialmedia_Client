/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: ['./src/Component/user/auth/Signup.jsx','./src/Component/user/auth/Login.jsx','./src/Component/user/Header/Header.jsx'],
  // ...
}

