import React, { useState } from 'react';

function Create() {
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [isPostButtonDisabled, setIsPostButtonDisabled] = useState(true);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setCaption(''); // Reset caption when a new image is selected
        setIsPostButtonDisabled(true); // Disable post button
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCaptionChange = (event) => {
    const newCaption = event.target.value;
    setCaption(newCaption);
    setIsPostButtonDisabled(newCaption === '');
  };

  const handleCancel = () => {
    setImagePreview(null); // Clear the image preview
    setCaption(''); // Clear the caption
    setIsPostButtonDisabled(true); // Disable post button
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-80 border-2 rounded-lg" style={{ backgroundColor: '#030712' }}>
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
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        )}
        {imagePreview && (
          <div className="mt-4 ml-6 w-64">
          <input
  type="text"
  placeholder="Enter caption"
  className="w-full p-2 border rounded bg-gray-900 text-white"
  value={caption}
  onChange={handleCaptionChange}
/>


            <div className="mt-4 flex justify-between">
              <button
                className={`p-2 rounded ${isPostButtonDisabled ? 'bg-gray-500 text-gray-200' : 'bg-blue-500 text-white'}`}
                disabled={isPostButtonDisabled}
              >
                Post
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Create;
