import React, { useState, useEffect } from 'react';
import axios from "../../Axios/axios";
import ReactPlayer from 'react-player';
import {useSelector } from 'react-redux';
function UserProfile({userId}) {

  const [isFollowing, setIsFollowing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  const currentUserId = useSelector((store) => store.user?.userData?.payload?.userId);
  useEffect(() => {
    fetchUser();
    getUserPosts();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/${userId}/user`);
      setUser(response.data);

      // Check if the current user is in the followers array to determine follow status
      const currentUserFollows = response.data.followers.includes(currentUserId); // Replace 'currentUser.id' with the actual property that represents the user id
      setIsFollowing(currentUserFollows);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const getUserPosts = async () => {
    await axios.get(`/userPost/${userId}`).then((response) => {
      const reversedPosts = response.data.slice().reverse();
      setPosts(reversedPosts);
    });
  };

  const handleToggleFollow = async () => {
    
    try {
      const friendId = userId; // Replace 'user.id' with the actual property that represents the user id
        console.log(user._id,"friiiiiinddddddddddwwwwwwwwdid");
        console.log(friendId,"friiiiiindid");
      if (isFollowing) {
        // Unfollow logic
        console.log("folloowwwwwwww");
        try {
          await axios.put(`/${currentUserId}/unfollow`, { id: friendId });
          console.log('Unfollow successful');
        } catch (error) {
          console.error('Error unfollowing user:', error);
        }
      } else {
        console.log("unfollowwwwwwwwwww");
        // Follow logic
        try {
          await axios.put(`/${currentUserId}/follow`, { id: friendId });
          console.log('Follow successful');
        } catch (error) {
          console.error('Error following user:', error);
        }
      }

      // Toggle the follow state
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };



  return (
    <div>
      <div className="w-full mt-2">
        <div className="rounded-lg mt-8 relative">
          <div
            className="bg-[#030712] shadow-md rounded-lg mb-10 sm:mb-0 mx-auto sm:w-3/6 h-auto relative"
            style={{ border: '3px solid #083344' }}
          >
            <div className="w-24 h-24 rounded-lg  overflow-hidden mx-auto" style={{ position: 'relative', top: '-50px' }}>
              <img src={ user?.dp || "/assets/man-avatar.webp"} className="w-full h-full object-cover" />
            </div>

            <div className="text-center text-white" style={{ position: 'relative', top: '-50px' }}>
              <h1 className="text-lg font-bold">{user?.username}</h1>
              <p className="text-sm">{user?.bio}</p>
              <div className="text-center mt-4" style={{ position: 'relative', top: '-20px' }}>
              <button className="text-white border mt-2 border-gray-900 rounded-lg text-sm hover:text-blue-500" onClick={handleToggleFollow}>
                {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            </div>

            <div className="text-center  justify-center flex flex-wrap" style={{ position: 'relative', top: '-40px' }}>
              <div className="text-white text-md">
                <span>Post</span>
                <span className="block">{posts?.length}</span>
              </div>
              <div className="text-white text-md mx-10">
                <span>Followers</span>
                <span className="block">{user?.followers?.length}</span>
              </div>
              <div className="text-white text-md">
                <span>Following</span>
                <span className="block">{user?.following?.length}</span>
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
                    <div
                      className="bg-gray-900"
                      style={{
                        width: '100%',
                        height: '300px',
                        position: 'relative',
                      }}
                    >
                      {post.post[0].includes('video') ? (
                        <>
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '10px',
                              right: '10px',
                              width: '20px',
                              height: '20px',
                            }}
                          >
                            <img src="/assets/play.png" alt="Play" />
                          </div>

                          <ReactPlayer url={post.post[0]} width="100%" height="100%" />
                        </>
                      ) : (
                        <img
                          src={post.post[0]}
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
    </div>
  );
}

export default UserProfile;
