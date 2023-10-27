import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import cloudinary from 'cloudinary-core'
import Axios from 'axios';
import Spinner from '../../Loading';
import { useSelector } from 'react-redux';
import axios from '../../Axios/axios';

const cl=cloudinary.Cloudinary.new({cloud_name:'dhzusekrd'})

function Create() {
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [caption, setCaption] = useState('');
  const [isPostButtonDisabled, setIsPostButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const history = useHistory(); // Initialize history

  const user = useSelector((store) => store.user?.userData?.payload);
  const userId = user.userId;

  const handleFileChange = (event) => {
    // ... (no change in this part)
  };

  const handleCaptionChange = (event) => {
    // ... (no change in this part)
  };

  const handleCancel = () => {
    // ... (no change in this part)
  };

  const handlePost = async () => {
    setLoading(true); // Start loading

    // ... (no change in this part)

    if (fileUrl) {
      const newPost = {
        caption,
        fileUrl
      };

      try {
        await axios.post(`/${userId}`, newPost);
        setCaption('');
        setImage(null);
        setVideo(null);
        setImagePreview(null);
        setLoading(false); // Stop loading

        // Redirect to the home component
        history.push('/home');
      } catch (error) {
        console.error(error, "Error adding new post");
        setLoading(false); // Stop loading on error
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-80 border-2 rounded-lg" style={{ backgroundColor: '#030712' }}>
        {/* ... (no change in this part) */}

        {loading ? (
          <Spinner /> // Display a loading spinner while loading
        ) : (
          /* ... (no change in this part) */
        )}
      </div>
    </div>
  );
}

export default Create;
