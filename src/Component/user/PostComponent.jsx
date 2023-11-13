import React, { useEffect,useState } from 'react';
import { CardContent, CardHeader, IconButton, Avatar, Typography, Input,Button } from '@mui/material';
import axios from '../../Axios/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPost,PostOwnerDetails,likeLoading } from '../../Redux/Reducers/postReducer';
import moment from 'moment';
import { motion } from 'framer-motion';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function PostComponent() {
  
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const [usersData, setUsersData] = useState({});
    const [commentInputs, setCommentInputs] = useState({});
    const [userLikedPosts, setUserLikedPosts] = useState({});
    const [commentText, setCommentText] = useState({});
    
    const userId = useSelector((store) => store.user?.userData?.payload?.userId);
    const username = useSelector((store) => store.user?.userData?.payload?.username);
  
    
    const handleCommentClick = (postId) => {
      setCommentInputs((prevInputs) => ({
        ...prevInputs,
        [postId]: !prevInputs[postId],
      }));
    };

    const handleCommentChange = (postId, event) => {
      setCommentText((prevText) => ({
        ...prevText,
        [postId]: event.target.value,
      }));
    };

    const addComment = async (postId) => {
      try {
       console.log("commented");
       const data=await axios.put(`/:${postId}/comment`,{
        userId,
        comment:commentText[postId],
        username,
       })
       console.log(data,"commentd");
       setCommentText((prevText) => ({
        ...prevText,
        [postId]: "",
        
      }));
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };
  


    
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/getAllPost/${userId}`);
        console.log(response.data);
    
        // Sort the posts in descending order based on the 'createdAt' field.
        const sortedPosts = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        const usersData = {};

        const likedPosts = {};
        sortedPosts.forEach((post) => {
          likedPosts[post._id] = post.likes.includes(userId);
        });
        setUserLikedPosts(likedPosts);

        for (const post of sortedPosts) {
          if (!usersData[post.userId]) {
            const userResponse = await axios.get(`/getUsersData/${post.userId}`);
            usersData[post.userId] = userResponse.data;
          }
        }
          dispatch(PostOwnerDetails(usersData));
        dispatch(setPost(sortedPosts));
        setPosts(sortedPosts);
        setUsersData(usersData);
      } catch (err) {
        console.log(err, "error in the get all post");
      }
    };
    
    useEffect(()=>{
     
      fetchPosts()
    },[]) 

useEffect(() => {

 
  const intervalId = setInterval(() => {
    setPosts((prevPosts) => prevPosts.map(post => ({
      ...post,
      relativeTime: getRelativeTime(post.createdAt),
    })));
  }, 60000); 

  return () => {
 
    clearInterval(intervalId);
  };
}, []);

const getRelativeTime = (createdAt) => {
  const now = moment();
  const postTime = moment(createdAt);
  const minutesDiff = now.diff(postTime, 'minutes');
  
  if (minutesDiff < 1) {
    return 'just now';
  } else if (minutesDiff < 60) {
    return `${minutesDiff} minute${minutesDiff > 1 ? 's' : ''} ago`;
  } else if (minutesDiff < 60 * 24) {
    const hoursDiff = Math.floor(minutesDiff / 60);
    return `${hoursDiff} hour${hoursDiff > 1 ? 's' : ''} ago`;
  }  else if (minutesDiff < 60 * 24 * 2) {
    return '1 day ago';
  } else {
    const daysDiff = Math.floor(minutesDiff / (60 * 24));
    return `${daysDiff} days ago`;
  }
};
  const handleLike = async (postId) => {
    console.log("liked");
    try {
      // Make the API call to like the post
      await axios.put(`/${postId}/like`, { userId });

      // Update the local state with the new like count
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, likes: [...post.likes, userId] }
            : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleUnLike = async (postId) => {
    console.log("unliked");
    try {
      // Make the API call to unlike the post
      await axios.put(`/${postId}/unlike`, { userId });

      // Update the local state with the new like count
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, likes: post.likes.filter((id) => id !== userId) }
            : post
        )
      );
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };
 


  return (
   
    <div>
         {posts.map((post) => (
          <motion.div
          key={post.id}
          whileHover={{ scale: 1.01, zIndex: 1 }} // Add the scale and zIndex animations on hover
          transition={{ type: 'spring', stiffness: 300 }} // Add a spring transition for a smooth effect
        >
    <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#37474F', color: '#ECEFF1', borderRadius: '16px', overflow: 'hidden' , border: '3px solid #083344' }}>
        <CardHeader className="bg-[#030712] "
          avatar={
            <Avatar src={usersData[post.userId]?.dp || '/assets/man-avatar.webp'} alt={usersData[post.userId]?.username} />

          }
          
          title={usersData[post.userId]?.username}
          subheader={
            <span style={{ color: 'white' }}>
              {getRelativeTime(post.createdAt)}
            </span>
          }
         
          action={
            <>
              <IconButton aria-label="options" style={{ color: 'white' }}>
                <MoreHorizIcon />
              </IconButton>
            </>
          }
        />
        <img src={post.post} alt="" style={{ width: '320px', height: '340px' }} />
        <CardContent className="bg-[#030712]">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* ... */}
          </div>
  
          <div style={{ display: 'flex', alignItems: 'center', paddingBottom:'10px' }}>
  <div style={{ position: 'relative' }}>
  <img
  onClick={() => {
    const isLiked = userLikedPosts[post._id];
    isLiked ? handleUnLike(post._id) : handleLike(post._id);
    // Toggle the liked state
    setUserLikedPosts((prevLiked) => ({
      ...prevLiked,
      [post._id]: !isLiked,
    }));
  }}
  src={userLikedPosts[post._id] ? "/assets/unlike.gif" : "/assets/like.gif"}
  alt=""
  style={{ height: '25px', width: '25px' }}
/>
   {post.likes.length > 0 && (
      <div style={{ position: 'absolute', bottom: '-16px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', fontSize: '11px', color: 'white', display:'flex'}}>
      <div> {post.likes.length}</div> <div style={{marginLeft:'2px'}}>{post.likes.length === 1 ? ' like' : ' likes'}</div> 
      </div>
    )}
  </div>

  <img
    onClick={() => handleCommentClick(post._id)}
    src="/assets/comment.png"
    alt=""
    style={{ height: '20px', width: '20px', marginLeft: '4px' }}
  />
</div>

                  <div > 
                  {commentInputs[post._id] && (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Input
      placeholder="Add a comment..."
      value={commentText[post._id] || ''}
      onChange={(event) => handleCommentChange(post._id, event)}
      style={{
        width: '80%',
        padding: '0.25rem 0',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        color: '#ECEFF1',
      }}
    />
    {commentText[post._id]?.trim().length > 0 && ( // Check if there is at least one non-space character
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => addComment(post._id)}
        style={{
          marginLeft: '0.5rem',
          padding: '0.2rem 0.5rem', 
          backgroundColor: 'transparent',
          border: '1px solid #1976D2', 
          color: '#1976D2', 
        }}
      >
        Add
      </Button>
    )}
  </div>
)}

                </div>
        </CardContent>
      </div>
    </div>
    </motion.div>
          ))}
  </div>
  
      
  );
}

export default PostComponent;
