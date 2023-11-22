import React, { useState } from 'react';
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from "../../Axios/axios";
import ReactPlayer from 'react-player';

function Profile() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const profilePicture = useSelector((store) => store.update?.image);
  const data = useSelector((store) => store.user?.userData?.payload);
  const updatedData = useSelector((store) => store.update?.user);
  
  const userId=data.userId


  useEffect(() => {
    getUserPosts();
  }, [])
  
  useEffect(() => {
    fetchUser();
  }, [])


const fetchUser=async()=>{
 
  await axios.get(`/${userId}/user`).then((response)=>{
    console.log(response.data,"response in profileeeeee");
    setUser(response.data)
  })
}

  const getUserPosts=async()=>{
    await axios.get(`/userPost/${userId}`).then((response)=>{
      const reversedPosts = response.data.slice().reverse();
     
      setPosts(reversedPosts);
    })
  }
  
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
      <img src={profilePicture || data.dp || "/assets/man-avatar.webp"} className="w-full h-full object-cover" />
    </div>

    <div className="text-center text-white" style={{ position: 'relative', top: '-50px' }}>
      <h1 className="text-lg font-bold">{updatedData?.username ||data?.username}</h1>
      <p className="text-sm">{updatedData?.bio ||data?.bio}</p>
      <div className="text-center mt-4" style={{ position: 'relative', top: '-20px' }}>
      <button className="text-white border mt-2 border-gray-900 rounded-lg text-sm hover:text-blue-500" onClick={openModal}>Edit Profile</button>
    </div>
    </div>

   
    <div className="text-center  justify-center flex flex-wrap"  style={{ position: 'relative', top: '-40px' }}>
      <div className="text-white text-md">
        <span>Post</span>
        <span className="block">{posts.length}</span>
      </div>
      <div className="text-white text-md mx-10">
        <span>Followers</span>
        <span className="block">{user?.followers.length}</span>
      </div>
      <div className="text-white text-md">
        <span>Following</span>
        <span className="block">{user?.following.length}</span>
      </div>
    </div>
  </div>
</div>



    <div className="p-4 sm:p-8 relative bg-[#030712] mt-1 rounded-lg" style={{ border: '3px solid #083344' }}>
      <div className="p-4 sm:p-1">
      {posts.length === 0 ? (
                <div className="flex items-center justify-center h-56">
                 <img src="/assets/nopost3.png" alt="No Post Image" id="noPostImage" />
                </div>
              ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {posts.map((post, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden">
                      <div className='bg-gray-900'
                        style={{
                          width: '100%',
                          height: '300px',
                          position: 'relative',
                        }}
                      >
                        {post.post[0].includes('video') ? (
                          <>
                           <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            width: '20px',
                            height: '20px',
                          }}>
                          <img
                            src="/assets/play.png" // Play button image
                            alt="Play"
                            
                          />
                        </div>
                        
                          <ReactPlayer
                            url={post.post[0]} // Video URL
                            width="100%"
                            height="100%"
                           
                          />
                          </>
                        ) : (
                          // If post is an image
                          <img
                            src={post.post[0]} // Use the first image in the post array or a default image
                            alt={`Post ${index}`}
                            className="rounded-lg object-cover"
                            style={{ width: '100%', height: '100%' }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                )}
      </div>
    </div>
  </div>
  )}
  </div>
  );
}

export default Profile;
