import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from './Component/user/auth/Signup';
import Login from './Component/user/auth/Login';
import Home from './pages/user/Home.jsx';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AdminLogin from './Component/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard.jsx';

function App() {
  const [addjwtToken, setJwtToken] = useState("");
  const [adminJwtToken,setAdminJwtToken]=useState("")

  const auth = useSelector((state) => state.user.userData?.payload?.token);
  const adminAuth=useSelector((state)=>state?.admin?.adminData?.payload)
  useEffect(() => {
    setJwtToken(auth);
    setAdminJwtToken(adminAuth)
  }, [auth,adminAuth]);

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     if (!addjwtToken) {
  //       localStorage.removeItem("userAccessToken");
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [addjwtToken]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={!addjwtToken ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!addjwtToken ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={addjwtToken ? <Home /> : <Navigate to="/login" />} />
        <Route path="/admin/login" element={!adminJwtToken? <AdminLogin/>:  <Navigate to="/admin" />} />
        <Route path="/admin" element={ adminJwtToken ?<Dashboard/> :<Navigate to="/admin/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
