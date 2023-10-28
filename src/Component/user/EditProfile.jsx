import React, { useState } from 'react';

function EditProfile({ onClose }) {
    const [selectedImage, setSelectedImage] = useState(null);

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
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission here
      onClose();
    };
  
  return (
    <div className=" flex items-center justify-center">
      <div className="w-96 max-w-screen-md bg-gray-800 p-4 rounded-lg shadow-md overflow-hidden">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-gray-600  ">
              <img
                src={selectedImage || '/assets/image.jpg'}
                alt="Profile Picture"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute w-6 h-6 ml-20" style={{ position: 'relative', top: '-25px' }}>
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
              type="text"
              placeholder="Username"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="phoneNumber" className="block text-gray-300">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              placeholder="Phone Number"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="bio" className="block text-gray-300">
              Bio
            </label>
            <input
              id="bio"
              type="text"
              placeholder="Bio"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="location" className="block text-gray-300">
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="Location"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
            />
          </div>
          <div className="flex justify-between">
            <button
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
