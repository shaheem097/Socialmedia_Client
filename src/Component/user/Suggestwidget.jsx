import axios from '../../Axios/axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Suggestwidget() {
  const [suggestions, setSuggestions] = useState([]);
  const userId = useSelector((store) => store.user?.userData?.payload?.userId);

  const getSuggestions = async () => {
    const { data } = await axios.get(`/find-suggest/${userId}`);
    if (data) {
      // Add the isFollowing property to each suggestion and initialize it to false
      const suggestionsWithFollow = data.map(suggestion => ({ ...suggestion, isFollowing: false }));
      setSuggestions(suggestionsWithFollow);
    }
  };

  useEffect(() => {
    getSuggestions();
    console.log(suggestions,"suggestions");
  }, []);

  // Function to handle follow
  const handleFollow = async (index) => {
    const updatedSuggestions = [...suggestions];
    updatedSuggestions[index].isFollowing = true;
    setSuggestions(updatedSuggestions);

    const friendId = updatedSuggestions[index]._id;
    console.log(friendId,"ffffffffffrndid");
    try {
      // Send a follow API request with the friendId
      await axios.put(`/${userId}/follow`, { id: friendId }).then((res)=>{
        console.log( res,"foloowwwwww");
        
      })
    } catch (error) {
      console.error('Error following user:', error);
      // You can handle the error here
    }
  };

  // Function to handle unfollow
  const handleUnfollow = async (index) => {
    const updatedSuggestions = [...suggestions];
    updatedSuggestions[index].isFollowing = false;
    setSuggestions(updatedSuggestions);

    const friendId = updatedSuggestions[index]._id;
    console.log(friendId);
    try {
      // Send an unfollow API request with the friendId
      await axios.put(`/${userId}/unfollow`, { id: friendId }).then((res)=>{
        console.log(res,"unfolooow");
      })
    } catch (error) {
      console.error('Error unfollowing user:', error);
      // You can handle the error here
    }
  };

  // Maximum number of users to display
  const maxUsers = 5;

  const [cardHeight, setCardHeight] = useState('auto');

  useEffect(() => {
    const userCount = suggestions.length;
    if (userCount < maxUsers) {
      setCardHeight(`${userCount * 72}px`);
    } else {
      setCardHeight('auto');
    }
  }, [suggestions]);


  return (
    <div
      className="suggestion-card bg-[#030712] border border-white rounded p-4 max-h-[320px] relative overflow-hidden"
      style={{ height: cardHeight, color: '#ECEFF1', borderRadius: '16px', overflow: 'hidden', border: '3px solid #083344' }}
    >
      <h2 className="suggestion-heading text-white sticky top-0 bg-[#030712] text-center p-2 font-serif">
        Suggestions
      </h2>
      <hr className="border-b border-white my-2" />
      <div className="suggested-users max-h-[320px] overflow-y-scroll hide-scrollbar">
        <ul>
          {suggestions.map((user, index) => (
            <li key={user._id} className="user-card flex items-center py-3">
              <img
                className="user-profile-image w-18 h-18 rounded-full mr-3"
                src={user.userProfile || '/assets/man-avatar.webp'}
                alt={`${user.username}'s profile`}
                style={{ width: '50px', height: '50px' }} 
              />
              <div className="user-info flex flex-row items-center justify-between">
                <div className='w-16'>
                  <p className="username text-md font-semibold text-white">
                    {user.username}
                  </p>
                </div>
                <button
                  className={`follow-button bg-blue-500 ml-2 text-white px-2 rounded ${
                    user.isFollowing ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  onClick={() => user.isFollowing ? handleUnfollow(index) : handleFollow(index)}
                >
                  {user.isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Suggestwidget;
