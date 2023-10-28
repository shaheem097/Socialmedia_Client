import React, { useState } from 'react';
import EditProfile from './EditProfile';

function Profile() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (

    <div>
    {isModalOpen ? (
      <EditProfile onClose={closeModal} />
    ) : (
    <div class="w-full mt-2 ">
 <div className="rounded-lg mt-8 relative">
  <div className="bg-[#030712] shadow-md rounded-lg mb-10 sm:mb-0 mx-auto sm:w-3/6 h-auto relative" style={{ border: '3px solid #083344' }}>
    <div className="w-24 h-24 rounded-lg  overflow-hidden mx-auto" style={{ position: 'relative', top: '-50px' }}>
      <img src="/assets/image.jpg" className="w-full h-full object-cover" />
    </div>

    <div className="text-center text-white" style={{ position: 'relative', top: '-50px' }}>
      <h1 className="text-lg font-bold">Username</h1>
      <p className="text-sm">Bio text goes here</p>
      <div className="text-center mt-4" style={{ position: 'relative', top: '-20px' }}>
      <button className="text-white border mt-2 border-gray-900 rounded-lg text-sm hover:text-blue-500" onClick={openModal}>Edit Profile</button>
    </div>
    </div>

   
    <div className="text-center  justify-center flex flex-wrap"  style={{ position: 'relative', top: '-40px' }}>
      <div className="text-white text-md">
        <span>Post</span>
        <span className="block">100</span>
      </div>
      <div className="text-white text-md mx-10">
        <span>Followers</span>
        <span className="block">100</span>
      </div>
      <div className="text-white text-md">
        <span>Following</span>
        <span className="block">100</span>
      </div>
    </div>
  </div>
</div>



    <div className="p-4 sm:p-8 relative bg-[#030712] mt-4 rounded-lg" style={{ border: '3px solid #083344' }}>
      <div className="p-4 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Sample Post 1 */}
          <div className="rounded-lg ">
            <img src="/assets/image.jpg" alt="Sample Post 1" className="rounded-lg object-cover" />
          </div>
        </div>
      </div>
    </div>
  </div>
  )}
  </div>
  );
}

export default Profile;
