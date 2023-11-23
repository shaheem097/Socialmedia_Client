import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import axios from "../../Axios/axios";
import { useSelector } from 'react-redux';




const FollowListModal = ({ title, users, onClose }) => {
    
    
    const [usersWithDetails, setUsersWithDetails] = useState([]);
    
    const currentUserId = useSelector((store) => store.user?.userData?.payload?.userId);

    useEffect(() => {
        const fetchUserDetails = async () => {
          const usersData = [];
          
          for (const userId of users) {
            try {
              const response = await axios.get(`/getUsersData/${userId}`);
              const userData = response.data;
              
          const isFollowing = userData.followers.includes(currentUserId);
          
          userData.isFollowing = isFollowing;

          usersData.push(response.data);

            } catch (error) {
              console.error(`Error fetching user details for userId ${userId}:`, error);
            }
          }
          setUsersWithDetails(usersData);
        };
    
        fetchUserDetails();
      }, [users,currentUserId]);

      const handleToggleFollow = async (friendId, isFollowing, index) => {
        try {
          if (isFollowing) {
            // Unfollow logic
            await axios.put(`/${currentUserId}/unfollow`, { id: friendId });
          } else {
            // Follow logic
            await axios.put(`/${currentUserId}/follow`, { id: friendId });
          }
    
          // Update the isFollowing state for the specific user
          setUsersWithDetails((prevUsers) => {
            const newUsers = [...prevUsers];
            newUsers[index].isFollowing = !isFollowing;
            return newUsers;
          });
        } catch (error) {
          console.error('Error toggling follow:', error);
        }
      };


  return (
    <div className="follow-list-modal">
     <div className="modal-overlay" onClick={onClose}></div>
   
     <div className="modal-content">
     <div style={{ position: 'absolute',top:'3px',right:'3px'}}>
          <button
            style={{ float: 'right',paddingBottom:'18px' }}
            onClick={onClose}
            >
            <img src='/assets/cross.png' alt="Close" style={{ width: '15px', height: '15px' }} />
          </button>
              </div>
      <h2 className="modal-heading text-white text-center p-2 font-serif">{title}</h2>
      <hr className="border-b border-white my-2" />
      <div className="follow-list max-h-[320px] overflow-y-scroll hide-scrollbar">
        <ul>
          {usersWithDetails.map((user, index) => (
            <motion.div
              key={user._id}
              whileHover={{ scale: 1.1 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
            >
              <li className="user-card flex items-center py-3">
                <img
                  className="user-profile-image w-18 h-18 rounded-full mr-5"
                  src={user.dp || "/assets/man-avatar.webp"}
                  alt={`${user.username}'s profile`}
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="user-info flex flex-row items-center justify-between">
                  <div className="w-16">
                    <p className="username text-md font-semibold text-white">
                      {user.username}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-white hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 ml-2 "
                    onClick={() => handleToggleFollow(user._id, user.isFollowing, index)}
                  >
                    {user.isFollowing ? "Unfollow" : "Follow"}
                  </button>
                </div>
              </li>
            </motion.div>
          ))}
        </ul>
      </div>
     
      </div>
    </div>
  );
};

export default FollowListModal;
