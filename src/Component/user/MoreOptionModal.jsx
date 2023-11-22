import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../Axios/axios';
import { toggleFollow } from '../../Redux/Reducers/followReducer';
import { toast } from "react-toastify";

const MoreOptionsModal = React.memo(({ isOpen, onClose,postId,description, postOwner,onPostUpdate }) => {


const [isFollowing, setIsFollowing] = useState(false);

const [activeModal, setActiveModal] = useState(false);
const [isEditing, setIsEditing] = useState(false);
const [editedContent, setEditedContent] = useState('');
const [isReporting, setIsReporting] = useState(false);
const [reportContent, setReportContent] = useState('');
const [reportConfirmation, setReportConfirmation] = useState(false);
const [deleteConfirmation, setDeleteConfirmation] = useState(false);

const userId = useSelector((store) => store.user?.userData?.payload?.userId);
const friendId=postOwner._id



const dispatch=useDispatch()


const handleEditPost = () => {
  setEditedContent(description || '');
  setIsEditing(true);
};

const handleCancelEdit = () => {
  setIsEditing(false);
};

const handleSaveEdit = async () => {
 console.log("clicked save button");
  const updatedPost={
    text:editedContent
  }
  const response=await axios.post(`/${postId}/editPost`,updatedPost)
  console.log(response);
  onPostUpdate()
  setIsEditing(false);
  onClose();
};



const handleToggleFollow = async () => {
    try {
      // Perform the follow or unfollow action based on the current state
      if (isFollowing) {
        console.log("unfollow");
        try {
            
            await axios.put(`/${userId}/unfollow`, { id: friendId }).then((res) => {
              console.log(res?.data,"unfollowww");
             
            });
          } catch (error) {
            console.error("Error unfollowing user:", error);
            
          }
      } else {
        console.log('follow');
        try {
            
            await axios.put(`/${userId}/follow`, { id: friendId }).then((res) => {
      
             console.log(res.data?.details,"folollowwwwwers");
              
            });
          } catch (error) {
            console.error("Error following user:", error);
            
          }
          
      }

      // Toggle the follow state
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
      dispatch(toggleFollow({ userId: postOwner._id }));    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };


  const handleDeletePost = async () => {
    // Display confirmation dialog
    // setShowDeleteConfirmation(true); 
    setActiveModal(true); 
    setDeleteConfirmation(true)
  };

  const handleConfirmDelete = async () => {
    try {
      // Perform delete operation
     
      const response=await axios.delete(`/${postId}/deletepost`)
      console.log(response);
      onPostUpdate()
      // setShowDeleteConfirmation(false);
      setDeleteConfirmation(false)
      setActiveModal(false);
      onClose();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleCancelDelete = () => {
   
    setDeleteConfirmation(false)
    setActiveModal(false);
  };
useEffect(() => {
    // Check if the current user is in the followers array
    setIsFollowing(postOwner?.followers?.includes(userId));
  }, [postOwner, userId]);


  const handleReportPost = () => {

    setReportContent('');
    
    setIsReporting(true)

  };

  const handleCancelReport = () => {

  setReportConfirmation(false)
    setActiveModal(false);
    setIsReporting(false)
  };

  const handleReportConfirmation=async()=>{
    setActiveModal(true)
    setReportConfirmation(true)

  }

  const ReportConfirmed = async () => {
    const response=await axios.put(`/${postId}/report-post`,{
      userId,
      reason:reportContent
    })
    if(response?.data===false){
      toast.error("Already Reported !!");

    }else{

    toast.error("Reported !!");
  }
    setIsReporting(false)
    setReportConfirmation(false)
    setActiveModal(false);
    onPostUpdate()
    onClose();
  
  };

  const modalStyle = {
    display: isOpen ? 'block' : 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#030712',
    padding: '20px',
    color: 'white',
    zIndex: 999,
    borderRadius: '10px', // Set the border radius for curvature
    border: '2px solid #155e75',
    textAlign:'center',
    width:'280px'
  };
  const dialogStyle = {
    background: '#030712',
    padding: '20px',
    color: 'white',
   
    textAlign: 'center',
  };

  const backdropStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: isOpen ? 'block' : 'none',
    zIndex: 998, // below the modal (999) but above the content (1)
  };

  const buttonStyle = {
    color: 'white',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  };

  const hoverColor = '#f0f0f0';



  return (
    <div style={{ width: '100%' }}>
      <div style={backdropStyle}  onClick={() => { onClose(); setActiveModal(false);setIsEditing(false);setIsReporting(false) }}></div>
      
      {activeModal ? (
        <>
        <div style={modalStyle}>
          <div style={{ ...dialogStyle,  textAlign: 'center' }}>
            <h3 style={{ color: '#ff6161' }}>{deleteConfirmation ?"Delete Post":"Report Post"}</h3>
            <p>{deleteConfirmation?"Are you sure you want to delete this post?":"Are you sure you want to Report this post?"}</p>
            <div style={{paddingTop:'20px'}}>
            {deleteConfirmation ? (
            // If deleteConfirmation is true, render delete confirmation buttons
            <>
              <button onClick={handleCancelDelete}>Cancel</button>
              <button
                onClick={handleConfirmDelete}
                style={{ color: '#ff6161', marginLeft: '20px' }}
              >
                Confirm
              </button>
            </>
          ) : (
            // If deleteConfirmation is false, render report confirmation buttons
            <>
              <button onClick={handleCancelReport}>Cancel</button>
              <button
                onClick={ReportConfirmed}
                style={{ color: '#ff6161', marginLeft: '20px' }}
              >
                Confirm
              </button>
            </>
          )}
            </div>
          </div>
        </div>

        </>
      ) :
      
      
      
       (
      <div style={modalStyle}>
        <div>
            <div style={{ position: 'absolute',top:'3px',right:'3px'}}>
          <button
            style={{ ...buttonStyle, float: 'right',paddingBottom:'18px' }}
            onClick={onClose}
            >
            <img src='/assets/cross.png' alt="Close" style={{ width: '15px', height: '15px' }} />
          </button>
              </div>
          <div style={{ width: '100%' }}>
          {postOwner?._id !== userId && (
             <>

              {isReporting ? (
                   <div style={modalStyle}>
                   <div style={{ ...dialogStyle,  textAlign: 'center' }}>
                     <h3 style={{ color: '#ff6161' }}>Report Post</h3>
                     <div style={{paddingTop:'30px'}}>
                     <input
                          type="text"
                          onChange={(e) => setReportContent(e.target.value)}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"

                        />
                        <div style={{paddingTop:'15px'}}>
                    <button onClick={handleCancelReport}>Cancel</button>
                        <button onClick={handleReportConfirmation} style={{ color: '#ff6161', marginLeft: '40px' }}>
                          Report
                        </button>
                        </div>
                     </div>
                   </div>
                 </div>
                  ) : null}
          <button
              style={buttonStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
            >
              About this account
            </button>
            <hr style={{ border: '1px solid #155e75', margin: '8px 0', width: '100%', }} /> 
         
              <button style={buttonStyle} onClick={handleToggleFollow}>
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            <hr style={{ border: '1px solid #155e75', margin: '8px 0', width: '100%' }} />
            
            <button style={buttonStyle} onClick={handleReportPost}>
              Report
            </button>

            <hr style={{ border: '1px solid #155e75', margin: '8px 0', width: '100%' }} />
                </>
            )}

            
            <div>
          
              
            {postOwner && postOwner._id === userId && (
                <>
                {isEditing ? (
                   <div style={modalStyle}>
                   <div style={{ ...dialogStyle,  textAlign: 'center' }}>
                     <h3 style={{ color: '#ff6161' }}>Edit Post Description</h3>
                     <div style={{paddingTop:'30px'}}>
                     <input
                          type="text"
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-white"

                        />
                        <div style={{paddingTop:'15px'}}>
                    <button onClick={handleCancelEdit}>Cancel</button>
                        <button onClick={handleSaveEdit} style={{ color: '#ff6161', marginLeft: '40px' }}>
                          Save
                        </button>
                        </div>
                     </div>
                   </div>
                 </div>
                  ) : null}
                   <button style={buttonStyle} onClick={handleEditPost}>
                    Edit
                  </button>
                  <hr style={{ border: '1px solid #155e75', margin: '8px 0', width: '100%' }} />
                  <button 
                  onClick={handleDeletePost}
                  style={buttonStyle}>Delete</button>
                </>
              )}
            </div>
          </div>
        </div>
        
      </div>
      )}
    </div>
  );
});

export default MoreOptionsModal;
