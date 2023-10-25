import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { useDispatch} from "react-redux";
import withReactContent from "sweetalert2-react-content";
import {setAdmin} from '../../Redux/Reducers/adminAuthReducer'

function Sidebar({ setActivePage }) {
 const navigate=useNavigate()
    const dispatch=useDispatch()

  const handleLogout=()=>{

   

    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Are you sure?",
      text: "To Logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn bg-danger",
        cancelButton: "btn bg-success",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform delete operation
        localStorage.removeItem("adminAccessToken");
        
        dispatch(setAdmin(null))
        navigate("/admin/login");
      }
    });
  };
  return (
<div class="h-screen w-14 md:w-64 text-white flex flex-col rounded-tl-lg md:rounded-bl-lg md:rounded-tr-lg transition-width duration-300">
  <div class="py-4 px-4">
    <div>
      
    <div class="hidden md:flex flex-col items-center justify-center mb-4 h-48">
  <div class="text-center">
    <img src='/assets/logo.png' alt="Logo" class="w-18 h-18 md:w-22 md:h-22 mr-2"/>
  </div>
 
</div>
<div class="my-2 border border-[#155e75] rounded-lg">
          <button
            onClick={() => setActivePage('dashboard')}
            class="hover:bg-[#083344] p-2 rounded w-full md:flex md:items-center md:justify-start relative"
          >
            <div class="line"></div>
            <img
          src="/assets/layout.png"
          alt="Dashboard Icon"
          class="w-6 h-6 md:w-6 md:h-6 mr-2"
        />
            <span class="hidden md:inline">Dashboard</span>
          </button>
        </div>

      <div class="my-2 border border-[#155e75] rounded-lg">
        <button
          onClick={() => setActivePage('user')}
          class="hover:bg-[#083344] p-2 rounded w-full md:flex md:items-center md:justify-start relative"
        >
          <div class="line"></div>
          <img src="/assets/user.png" alt="Dashboard Icon" class="icon-image mr-2" />

          <span class="hidden md:inline">User Management</span>
        </button>
      </div>
  
        {/* <div class="my-2 border  border-[#155e75] rounded-lg">
          <button
            onClick={() => setActivePage('post')}
            class="hover:bg-[#083344] p-2 rounded w-full md:flex md:items-center md:justify-start relative"
          >
            <div class="line"></div>
            <img
         src="/assets/management.png"
          alt="Post Icon"
          class="w-6 h-6 md:w-6 md:h-6 mr-2"
        />
            <span class="hidden md:inline">Post Management</span>
          </button>
        </div> */}
  
        <div class="my-2 border border-[#155e75] rounded-lg">
          <button
            onClick={() => setActivePage('report')}
            class="hover:bg-[#083344] p-2 rounded w-full md:flex md:items-center md:justify-start relative"
          >
            <div class="line"></div>
            <img
         src="/assets/report.png"
          alt="Report Icon"
          class="w-6 h-6 md:w-6 md:h-6 mr-2"
        />
            <span class="hidden md:inline">Report Management</span>
          </button>
        </div>
  
        <div class="my-2 border border-[#155e75] rounded-lg">
          <button
            onClick={handleLogout}
            class="hover:bg-[#083344] p-2 rounded w-full md:flex md:items-center md:justify-start relative"
          >
            <div class="line"></div>
            <img
         src="/assets/exit.png"
          alt="Logout Icon"
          class="w-6 h-6 md:w-6 md:h-6 mr-2"
        />
            <span class="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  

);

}

export default Sidebar
