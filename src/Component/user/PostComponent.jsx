import React, { useEffect,useState } from 'react';
import { CardContent, CardHeader, IconButton, Avatar, Typography, Input } from '@mui/material';
import axios from '../../Axios/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPost,PostOwnerDetails } from '../../Redux/Reducers/postReducer';
import moment from 'moment';
import { motion } from 'framer-motion';


function PostComponent() {
  
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const [usersData, setUsersData] = useState({});

    const userId = useSelector((store) => store.user?.userData?.payload?.userId);
    
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/getAllPost/${userId}`);
        console.log(response.data);
    
        // Sort the posts in descending order based on the 'createdAt' field.
        const sortedPosts = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
    
        const usersData = {};

        for (const post of sortedPosts) {
          if (!usersData[post.userId]) {
            console.log(post.userId,"postidddddd");
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


  return (
   
    <div>
         {posts.map((post) => (
          <motion.div
          key={post.id}
          whileHover={{ scale: 1.09, zIndex: 1 }} // Add the scale and zIndex animations on hover
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
            <IconButton aria-label="options">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
                {/* ... */}
              </svg>
            </IconButton>
          }
        />
        <img src={post.post} alt="" style={{ width: '320px', height: '340px' }} />
        <CardContent className="bg-[#030712]">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* ... */}
          </div>
  
          <div style={{ marginTop: '0.75rem' }}>
            <Typography variant="body2">
              <span style={{ fontWeight: 'bold' }}>{usersData[post.userId]?.username}</span> {post.description
}
            </Typography>
          </div>
          <Input placeholder="Add a comment..." style={{ width: '100%', padding: '0.25rem 0', backgroundColor: 'transparent', border: 'none', borderRadius: '4px', fontSize: '14px', color: '#ECEFF1' }} />
        </CardContent>
      </div>
    </div>
    </motion.div>
          ))}
  </div>
  
      
  );
}

export default PostComponent;
