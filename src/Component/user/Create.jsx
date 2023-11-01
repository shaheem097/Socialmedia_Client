import React, { useState } from 'react';
import cloudinary from 'cloudinary-core'
import Axios from 'axios';
import Spinner from '../../Loading';
import { useSelector } from 'react-redux';
import axios from '../../Axios/axios';
import { useNavigate } from 'react-router-dom';

const cl=cloudinary.Cloudinary.new({cloud_name:'dhzusekrd'})


function Create({ onPostSuccess, setHomeActive }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [caption, setCaption] = useState('');
  const [isPostButtonDisabled, setIsPostButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const user =useSelector((store) => store.user?.userData?.payload);
  const userId=user.userId;

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {

      if (file.type.startsWith('image/')) {
        setImage(file)
      
        // If it's an image, display it directly
        const reader = new FileReader();
        reader.onload = () => {
          
          setImagePreview(reader.result);
          setCaption(''); 
          setIsPostButtonDisabled(true); 
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        setVideo(file)
       
        setImagePreview('/assets/video-thumbnail.webp'); 
        setCaption(''); 
        setIsPostButtonDisabled(true); 
      }
    }
  };

  const handleCaptionChange = (event) => {
    const newCaption = event.target.value;
    setCaption(newCaption);
    setIsPostButtonDisabled(newCaption === '');
  };

  const handleCancel = () => {
    setImagePreview(null); 
    setImage(null);
    setVideo(null);
    setCaption(''); 
    setIsPostButtonDisabled(true); 
  };

  const handlePost = async() => {
    setLoading(true);

    let fileUrl;
    
    const formData = new FormData();
    

    if (image) {
    
      formData.append('file', image);
      formData.append('upload_preset', 'image_preset');
      
  
    await  Axios.post('https://api.cloudinary.com/v1_1/dhzusekrd/image/upload', formData)
        .then((response) => {
          

           fileUrl=response.data.secure_url
           console.log(fileUrl);
           
        })
        .catch((error) => {
          console.error(error, "Image upload error");
        });
    } else if (video) {
     
      formData.append('file', video);
      formData.append('upload_preset','video_preset');
      
     
     await Axios.post('https://api.cloudinary.com/v1_1/dhzusekrd/video/upload', formData)
        .then((response) => {
         
          console.log(response, "Video upload response");

           fileUrl=response.data.secure_url
           console.log(fileUrl);

        })
        .catch((error) => {
          console.error(error, "Video upload error");
        });
    } 

if(fileUrl){
  const newPost={
    caption,
    fileUrl
  }
  try {
    await axios.post(`/${userId}`, newPost);
    setCaption('');
    setImage(null);
    setVideo(null);
    setImagePreview(null);
    setLoading(false); // Stop loading

    // Redirect to the home component
    setHomeActive();
  } catch (error) {
    console.error(error, "Error adding new post");
    setLoading(false); // Stop loading on error
  }
}
    
    
  };
  


  return (
   <div>

    

    <div className="flex flex-col items-center justify-center h-screen">
  <div className="w-80 border-2 rounded-lg" style={{ backgroundColor: '#030712' }}>
    {loading ? (
      <Spinner /> // Display a loading spinner while loading
    ) : (
      <>
        {imagePreview ? (
          <img
            className="w-80"
            src={imagePreview}
            alt="Uploaded"
          />
        ) : (
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#030712] dark:hover-bg-bray-800 dark-bg-gray-700 hover-bg-[#020617] dark-border-gray-600 dark-hover-border-gray-500 dark-hover-bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 w-80">
              <img className="w-16 h-16 mb-4" src="/assets/plus.png" alt="" />
              <p className="mb-2 mt-2 text-base text-gray-100 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
          </label>
        )}
        {imagePreview && (
          <div className="mt-4 ml-6 w-64">
            <input
              type="text"
              placeholder="Enter caption"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"
              value={caption}
              onChange={handleCaptionChange}
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={handlePost}
                className={`p-2 rounded ${
                  isPostButtonDisabled
                    ? "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    : "text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                }`}
                disabled={isPostButtonDisabled}
              >
                Post
              </button>
              <button
                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </>
    )}
  </div>
</div>

</div>
  );
}

export default Create;
