import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { useDispatch} from "react-redux";
import withReactContent from "sweetalert2-react-content";

import {setAdmin} from '../../Redux/Reducers/Auth/adminAuthReducer'
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

    <div class="flex items-center mb-4">
      <img src="../../logo.png" alt="Logo" class="w-8 h-8 md:w-12 md:h-12 mr-2" />
      <span class="hidden md:inline">Your Logo Text</span>
    </div>

  
    <button
      onClick={() => setActivePage('user')}
      class="my-2 hover:bg-gray-800 p-2 rounded md:flex md:items-center md:justify-start relative"
    >
      <div class="line"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 md:w-6 md:h-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <span class="hidden md:inline">User Management</span>
    </button>

    <button
      onClick={() => setActivePage('post')}
      class="my-2 hover:bg-gray-800 p-2 rounded md:flex md:items-center md:justify-start relative"
    >
      <div class="line"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 md:w-6 md:h-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <span class="hidden md:inline">Post Management</span>
    </button>

    <button
      onClick={() => setActivePage('report')}
      class="my-2 hover-bg-gray-800 p-2 rounded md:flex md:items-center md:justify-start relative"
    >
      <div class="line"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 md:w-6 md:h-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4"
        />
      </svg>
      <span class="hidden md:inline">Report Management</span>
    </button>

    <button
       onClick={handleLogout}
      class="my-2 hover-bg-gray-800 p-2 rounded md:flex md:items-center md:justify-start relative"
    >
      <div class="line"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 md:w-6 md:h-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M16 3H8a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2zm-2 10h-2a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2z"
        />
      </svg>
      <span class="hidden md:inline">Logout</span>
    </button>
  </div>
</div>

);

}

export default Sidebar
