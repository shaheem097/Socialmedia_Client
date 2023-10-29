import { useSelector } from 'react-redux';
import axios from '../../Axios/axios';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";

function EditProfile({ onClose }) {

    const [userData, setUserData] = useState({});
    const [selectedImage, setSelectedImage] = useState(userData.dp?userData.dp:'');
    const [updatedData, setUpdatedData] = useState({});
    const [validationErrors, setValidationErrors] = useState({});

   
    const userId= useSelector((store) => store.user?.userData?.payload?.userId);

    const fetchUserData=async ()=>{
        await axios.get(`/${userId}/user`).then((response)=>{
            setUserData(response.data);
            setUpdatedData({
                username:response.data.username,
                email:response.data.email,
                phone:response.data.phone.toString()
            })
         
        })
    }

    useEffect(()=>{
     fetchUserData()
      
    },[userId])

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setUpdatedData({ ...updatedData, [name]: value }); 
       
        setValidationErrors({ ...validationErrors, [name]: '' });  
    };

    const validateForm = (data) => {
        const errors = {};
      
        // Validate Username (Required)
        if (!data.username ||!data.username.trim()) {
          errors.username = 'Username is required';
        }
      
        // Validate Email (Required)
        if (!data.email || !data.email.trim()) {
          errors.email = 'Email is required';
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(data.email)) {
            errors.email = 'Invalid email format';
          }
        }
      
        if (!data.phone || !data.phone.trim()) {
          errors.phone = 'Phone number is required';
        } else if (data.phone && !/^(\d{10})?$/.test(data.phone.trim())) {
          errors.phone = 'Invalid phone number format';
        }
      
        // Validate Bio (Required)
        if (!data.bio || !data.bio.trim()) {
          errors.bio = 'Bio is required';
        }
      
        // Validate Location (Required)
        if (!data.location || !data.location.trim()) {
          errors.location = 'Location is required';
        }
      
        return errors;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        // Send the updated data to the backend
        const errors = validateForm(updatedData);
        if (Object.keys(errors).length > 0) {
          // Display validation errors below input fields
          setValidationErrors(errors);
          return;
        } 

        const changedFields = {};

  // Check if username, email, and phone are not the same in userData and updatedData
  if (userData.username !== updatedData.username) {
    changedFields.username = updatedData.username;
  }

  if (userData.email !== updatedData.email) {
    changedFields.email = updatedData.email;
  }

  if (userData.phone.toString() !== updatedData.phone) {
    changedFields.phone = updatedData.phone;
  }


  // Proceed to Step 2: Check for Existing Data only if there are changed fields
  if (Object.keys(changedFields).length > 0) {
    try {
        // const dataExists = await checkExistingData(changedFields);
        await axios.post('/checkExistingData',changedFields).then((response)=>{
            if(response?.data?.status===true){
                console.log(response?.data?.status,"responsssssssssssss");
            }else{
                toast.error(response.data.message);
            }
        })
       
        if(selectedImage){
            console.log(selectedImage);
        }else{
            console.log('no image selected');
        }
    }
     
    catch (error) {
      console.error('Error checking existing data:', error);
    }

  }

        
        
 };
    
  return (
    <div className=" flex items-center justify-center">
      <div className="w-96 max-w-screen-md bg-gray-800 p-4 rounded-lg shadow-md overflow-hidden">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-gray-600  ">
              <img
                src={selectedImage || '/assets/man-avatar.webp'}
                alt="Profile Picture"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute w-6 h-6 ml-16 mt-2" style={{ position: 'relative', top: '-25px' }}>
                <label
                  htmlFor="imageInput"
                  className="rounded-full"
                >
                  <img className='' src="/assets/editprofile.png" alt="" />
                </label>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-2">Edit Profile</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="mb-2">
            <label htmlFor="username" className="block text-gray-300">
              Username
            </label>
            <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={updatedData.username !== undefined ? updatedData.username : userData.username || ''}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
                required
              />
               {validationErrors.username && (
              <div className="text-red-500">{validationErrors.username}</div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-gray-300">
              Email
            </label>
            <input
              id="email"
              name='email'
              type="text"
              placeholder="Email"
              value={updatedData.email !== undefined ? updatedData.email : userData.email || ''}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
              required
            />
               {validationErrors.email && (
              <div className="text-red-500">{validationErrors.email}</div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="phoneNumber" className="block text-gray-300">
              Phone Number
            </label>
            <input
              id="phone"
              name='phone'
              type="text"
              placeholder="Phone Number"
              value={updatedData.phone !== undefined ? updatedData.phone : userData.phone || ''}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
              required
            />
               {validationErrors.phone && (
              <div className="text-red-500">{validationErrors.phone}</div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="bio" className="block text-gray-300">
              Bio
            </label>
            <input
              id="bio"
              name='bio'
              type="text"
              placeholder="Bio"
              value={updatedData.bio !== undefined ? updatedData.bio : userData.bio || ''}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
            />
               {validationErrors.bio && (
              <div className="text-red-500">{validationErrors.bio}</div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="location" className="block text-gray-300">
              Location
            </label>
            <input
              id="location"
              name='location'
              type="text"
              placeholder="Location"
              value={updatedData.location !== undefined ? updatedData.location : userData.location || ''}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
            />
               {validationErrors.location && (
              <div className="text-red-500">{validationErrors.location}</div>
            )}
          </div>
          <div className="flex justify-between">
            <button
            onClick={handleSubmit}
              type="submit"
              className="w-1/2 bg-[#06b6d4] text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="w-1/2 bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring focus:bg-gray-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
