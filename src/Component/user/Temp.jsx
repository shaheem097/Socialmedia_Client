import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { useDispatch} from "react-redux";
import withReactContent from "sweetalert2-react-content";

import {setAdmin} from '../../Redux/Reducers/Auth/adminAuthReducer'

function AdminHeader() {
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
    <div className="sticky top-0 bg-black flex justify-between">
    <div className="relative bg-white dark:bg-black">
      <div className="flex items-center">
        <button
          className="text-black dark:text-white mr-2"
        
        >
          <span className="bg-black dark:bg-white w-6 h-0.5 block"></span>
          <span className="bg-black dark:bg-white w-6 h-0.5 block mt-1"></span>
          <span className="bg-black dark:bg-white w-6 h-0.5 block mt-1"></span>
        </button>
        <img
          
          height="60px"
          alt=""
          className="ml-2"
        />
        <a
          href="/admin"
          className="text-black no-underline dark:text-white ml-2"
        >
          <h6 className="ml-2 text-2xl">Admin</h6>
        </a>
      </div>
    
        <div
          className="text-black dark:text-white cursor-pointer"
         
        >
          <span className="bg-white dark:bg-black w-6 h-6 flex justify-center items-center">
            <span className="w-4 h-4 bg-black dark:bg-white rounded-full"></span>
          </span>
        </div>
      
        <div
          className="text-black dark:text-white cursor-pointer"
         
        >
          <span className="bg-black dark:bg-white w-6 h-6 flex justify-center items-center">
            <span className="w-4 h-4 bg-white dark:bg-black rounded-full"></span>
          </span>
        </div>
   
      <button
        className="text-black dark:text-white hover:bg-red-500"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  </div>
  
  );
};

export default AdminHeader
