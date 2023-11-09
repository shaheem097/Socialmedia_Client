import axios from "../../Axios/axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Suggestwidget() {
  const [suggestions, setSuggestions] = useState([]);
  const userId = useSelector((store) => store.user?.userData?.payload?.userId);

  const getSuggestions = async () => {
    const { data } = await axios.get(`/find-suggest/${userId}`);
    if (data) {
      // Add the isFollowing property to each suggestion and initialize it to false
      const suggestionsWithFollow = data.map((suggestion) => ({
        ...suggestion,
        isFollowing: false,
      }));
      setSuggestions(suggestionsWithFollow);
    }
  };

  useEffect(() => {
    getSuggestions();
  }, []);


  // Function to handle follow
  const handleFollow = async (index) => {
    const updatedSuggestions = [...suggestions];
    updatedSuggestions[index].isFollowing = true;
    setSuggestions(updatedSuggestions);

    const friendId = updatedSuggestions[index]._id;
    
    try {
      // Send a follow API request with the friendId
      await axios.put(`/${userId}/follow`, { id: friendId }).then((res) => {
       
        
      });
    } catch (error) {
      console.error("Error following user:", error);
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
      await axios.put(`/${userId}/unfollow`, { id: friendId }).then((res) => {
       
      });
    } catch (error) {
      console.error("Error unfollowing user:", error);
      // You can handle the error here
    }
  };

  // Maximum number of users to display
  const maxUsers = 5;

  const [cardHeight, setCardHeight] = useState("auto");

  useEffect(() => {
    const userCount = suggestions.length;
    if (userCount < maxUsers) {
      setCardHeight(`${userCount * 72}px`);
    } else {
      setCardHeight("auto");
    }
  }, [suggestions]);

  if (suggestions.length < 2) {
    return null; // This will hide the component
  }

  return (
    <div
      className="suggestion-card bg-[#030712] border border-white rounded p-4 max-h-[320px] relative overflow-hidden"
      style={{
        height: cardHeight,
        color: "#ECEFF1",
        borderRadius: "16px",
        overflow: "hidden",
        border: "3px solid #083344",
      }}
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
                className="user-profile-image w-18 h-18 rounded-full mr-5"
                src={user.userProfile || "/assets/man-avatar.webp"}
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
                  class="text-white  hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 ml-2 "
                  onClick={() =>
                    user.isFollowing
                      ? handleUnfollow(index)
                      : handleFollow(index)
                  }
                >
                  {user.isFollowing ? "Unfollow" : "Follow"}
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
