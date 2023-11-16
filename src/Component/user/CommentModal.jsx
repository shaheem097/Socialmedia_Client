import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../Axios/axios';
import { Input, Button } from '@mui/material';
import { setUpdatedPost } from '../../Redux/Reducers/postReducer';


function CommentModal({ isOpen, onClose, postId,comments ,postOwner }) {
  const [commentText, setCommentText] = useState("");
  const [visibleComments, setVisibleComments] = useState([]);
 
  const userId = useSelector((store) => store.user?.userData?.payload?.userId);
  const username = useSelector((store) => store.user?.userData?.payload?.username);
  const dp=useSelector((store) => store.user?.userData?.payload?.dp)
 
  const dispatch=useDispatch()

  useEffect(() => {
    if (isOpen) {
      setVisibleComments(comments);
    }
  }, [isOpen, comments]);

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const addComment = async () => {
    try {
      const data = await axios.put(`/:${postId}/comment`, {
        userId,
        comment: commentText,
        username,
        dp
      });
      dispatch(setUpdatedPost({ post: data.data }));
      const newComment = {
        userId,
        comment: commentText,
        username,
        dp
      };
      setVisibleComments((prevComments) => [...prevComments, newComment]); // Add the new comment immediately
      setCommentText("");
      onClose();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  const handleDeleteComment = async (comment) => {
    try {
      const data = await axios.put(`/:${postId}/delete-comment`, {
        userId: userId,
        index: comments.indexOf(comment),
      });
     
      // Update the local state to remove the deleted comment
      setVisibleComments((prevComments) => prevComments.filter((c) => c._id !== comment._id));

      onClose()
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  
  

  return (
    <div>
         <div style={{ display: isOpen ? 'block' : 'none', bottom: 0, left: 0, width: '100%', height: '100%', zIndex: 999, overflowY: 'auto', }}>
        <div className="bg-[#030712]" style={{ width: '320px', position: 'absolute', bottom: '-5%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', borderRadius: '8px', overflowY: 'auto', maxHeight: '300px', }}>
          {/* Down Arrow Close Button */}
          <div 
            style={{ paddingBottom:'30px'}}
            onClick={onClose}
          >
            <img style={{width:'30px',height:'30px', marginLeft:'110px'  }} src="/assets/down1.png" alt="" />
          </div>
          
          <div
            style={{
              paddingBottom: '10px',
              maxHeight: '200px',
              overflowX: 'hidden',
            }}
          >
          {visibleComments.slice().reverse().map((comment, index) => (
  <div key={index} style={{ marginBottom: '10px', fontSize: '13px', color: '#ECEFF1', alignItems: 'center', position: 'relative' }}>
    {/* Display picture and username in a row */}
    <div style={{ display: 'flex' }}>
      <img src={comment.dp} alt="user dp" style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '5px' }} />
      <strong style={{ marginRight: '5px' }}>{comment.username}</strong>
    </div>
    {/* Comment text below the dp and username */}
    <div style={{ marginLeft: '25px', wordWrap: 'break-word' }}>{comment.comment}</div>
    {/* Delete button */}
    {(postOwner === userId || comment.userId === userId) && (
                <img
                  src='/assets/trash1.png'
                  alt="Delete"
                  onClick={() => {
                    handleDeleteComment(comment);
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    cursor: 'pointer',
                    width: '15px', // Adjust the width as needed
                    height: '15px', // Adjust the height as needed
                  }}
                />
              )}
  </div>
))}
          </div>
      
        <div style={{ display: 'flex', alignItems: 'center', position: 'fixed', bottom: 0, }}>

       
            <Input
              placeholder="Add a comment..."
              value={commentText}
              onChange={handleCommentChange}
              style={{
                flex: '1',
                padding: '0.25rem 0',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                color: '#ECEFF1',
              }}
            />
            {commentText.trim().length > 0 && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={addComment}
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
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
