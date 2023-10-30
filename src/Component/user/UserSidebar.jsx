import React, { useState }from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { useDispatch, useSelector} from "react-redux";
import withReactContent from "sweetalert2-react-content";
import {setUserDetails} from '../../Redux/Reducers/singleReducer'
import axios from '../../Axios/axios';



function Sidebar({ setActivePage }) {
 const navigate=useNavigate()
    const dispatch=useDispatch()

    const data = useSelector((store) => store.user?.userData?.payload);

   
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
        localStorage.removeItem("userAccessToken");
        
        dispatch(setUserDetails(null))
        
        navigate("/login");
      }
    });
  };
    return (
  <div class="h-screen w-14 md:w-64 text-white flex flex-col rounded-tl-lg md:rounded-bl-lg md:rounded-tr-lg transition-width duration-300">
    <div class="py-4 px-4">
      <div>
        
      <div className="hidden md:flex flex-col items-center justify-center mb-4 h-72">
    <div className="text-center  hover:cursor-pointer" style={{ marginTop: '50px' }}>
      <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', marginTop: '20px' }}>
        <img src='/assets/man-avatar.webp' 
          onClick={() => setActivePage('profile')}
          alt="Logo" className="w-100 h-100 md:w-100 md:h-100 object-cover rounded-full" />
      </div>
      <p className="text-white" 
        onClick={() => setActivePage('profile')}
        style={{ marginTop: '10px' }}>{data.UserName}</p>
    </div>
  </div>

  <button
    onClick={() => setActivePage('profile')}
    class="hover:bg-[#083344] p-2 rounded w-full md:hidden flex items-center justify-start relative"
  >
    <div class="line"></div>
    <img
      src="/assets/user.png"
      alt="Dashboard Icon"
      class="w-6 h-6 md:w-6 md:h-6 mr-2 fixed-size-image"
    />
  </button>



  <div class="my-2 border border-[#155e75] rounded-lg">
            <button
              onClick={() => setActivePage('home')}
              class="hover:bg-[#083344] p-2 rounded w-full md:flex md:items-center md:justify-start relative"
            >
              <div class="line"></div>
              <img
    src="/assets/userhome.png"
    alt="Dashboard Icon"
    class="w-6 h-6 md:w-6 md:h-6 mr-2 fixed-size-image"
  />

              <span class="hidden md:inline">Home</span>
            </button>
          </div>


      
          <div class="my-2 border border-[#155e75] rounded-lg">
    <button
      onClick={() => setActivePage('create')}
      class="hover:bg-[#083344] p-2 rounded w-full md:flex md:items-center md:justify-start relative"
    >
      <div class="line"></div>
      <img
        src="/assets/plus.png"
        alt="Dashboard Icon"
        class="w-6 h-6 md:w-6 md:h-6 mr-2 fixed-size-image"
      />
      <span class="hidden md:inline">Create</span>
    </button>
  </div>
 

        <div class="my-2 border border-[#155e75] rounded-lg">
          <button
            onClick={() => setActivePage('message')}
            class="hover:bg-[#083344] p-2 rounded w-full md:flex md:items-center md:justify-start relative"
          >
            <div class="line"></div>
            <img src="/assets/chat.png" alt="Dashboard Icon"  class="w-6 h-6 md:w-6 md:h-6 mr-2 fixed-size-image"/>

            <span class="hidden md:inline">Message</span>
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
            class="w-6 h-6 md:w-6 md:h-6 mr-2 fixed-size-image"
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
