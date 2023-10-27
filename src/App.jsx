
import {BrowserRouter,Routes,Route,Navigate,} from "react-router-dom";
import Signup from './pages/user/Signup';
import Login from './pages/user/Login';
import Home from './pages/user/Home.jsx';
import { useState, useEffect,useMemo } from 'react';
import { useSelector } from 'react-redux';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard.jsx';
import ProfilePage from "./pages/user/ProfilePage";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { ThemeProvider,CssBaseline } from "@mui/material";
import Rashi from "./Component/user/Rashi";


function App() {
  const [userjwtToken, setJwtToken] = useState("");
  const [adminJwtToken,setAdminJwtToken]=useState("")

  const auth = useSelector((state) => state.user.userData?.payload?.token);
  const adminAuth=useSelector((state)=>state?.admin?.adminData?.payload)
  useEffect(() => {
    setJwtToken(auth);
    setAdminJwtToken(adminAuth)
  }, [auth,adminAuth]);
  

  const mode = useSelector((store) => store.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
 

  return (
    <div className="app">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/rashi" element={ <Rashi /> } />
        <Route path="/" element={userjwtToken ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!userjwtToken ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!userjwtToken ? <Signup /> : <Navigate to="/" />} />
        <Route path="/admin/login" element={!adminJwtToken? <AdminLogin/>:  <Navigate to="/admin" />} />
        <Route path="/admin" element={ adminJwtToken ?<Dashboard/> :<Navigate to="/admin/login" />} />
        <Route path="/profile/:userId" element={ userjwtToken ?<ProfilePage/> :<Navigate to="/login" />} />

      </Routes>
      </ThemeProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
