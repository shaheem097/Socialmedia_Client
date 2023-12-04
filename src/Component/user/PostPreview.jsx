// PostPreview.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoPlayer from "./VideoPlayer";
import { IconButton, Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../Axios/axios";
import {
    CardContent,
    CardHeader,
  } from "@mui/material";
  import moment from "moment";
import CommentModal from "./CommentModal";

const PostPreview = ({ post, onClose }) => {

  const userId = useSelector((store) => store.user?.userData?.payload?.userId);
  const [isLiked, setIsLiked] = useState(post.likes.includes(userId));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  
  const handleLike = async () => {
    try {
      // Make API call to like the post
      await axios.put(`/${post._id}/like`, { userId });

      setIsLiked(true);
      setLikeCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      // Make API call to unlike the post
      await axios.put(`/${post._id}/unlike`, { userId });
      setIsLiked(false);
      setLikeCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const getRelativeTime = (createdAt) => {
    const now = moment();
    const postTime = moment(createdAt);
    const minutesDiff = now.diff(postTime, "minutes");

    if (minutesDiff < 1) {
      return "just now";
    } else if (minutesDiff < 60) {
      return `${minutesDiff} minute${minutesDiff > 1 ? "s" : ""} ago`;
    } else if (minutesDiff < 60 * 24) {
      const hoursDiff = Math.floor(minutesDiff / 60);
      return `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;
    } else if (minutesDiff < 60 * 24 * 2) {
      return "1 day ago";
    } else {
      const daysDiff = Math.floor(minutesDiff / (60 * 24));
      return `${daysDiff} days ago`;
    }
  };

   const handleCommentClick = () => {
    setCommentModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setCommentModalOpen(false);
  };

  return (
    <AnimatePresence>
    <div className="modal-overlay" onClick={onClose}></div>
      {post && (
        <>
        
        
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "600px", // Set your desired fixed width
          width: "100%",
          maxHeight: "500px", // Set your desired fixed height
          height: "100%",
          backgroundColor: "#37474F",
          color: "#ECEFF1",
          borderRadius: "16px",
          overflow: "hidden",
          border: "3px solid #083344",
          zIndex: 1000
        }}
        
      >
       
          <div
          className="bg-[#030712] "
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflow: "hidden",
            }}
            
          >
            <CardHeader
              className="bg-[#030712] "
              avatar={
                <Avatar
                  src={post?.owner?.dp || "/assets/man-avatar.webp"}
                  style={{ cursor: "pointer" }}
                  alt={post?.owner?.username}
                />
              }
              title={
                <span style={{ cursor: "pointer" }}>
                  {post?.owner?.username}
                </span>
              }
              subheader={
                <span style={{ color: "white" }}>
                  {post?.relativeTime || getRelativeTime(post?.createdAt)}
                </span>
              }
              action={
                <IconButton aria-label="options" style={{ color: "white" }}>
                  <MoreHorizIcon />
                </IconButton>
              }
            />
            {post.post[0].includes("video") ? (
              // If post is a video
              <VideoPlayer url={post?.post[0]} />
            ) : (
              // If post is an image
              <img
                src={post?.post[0]}
                alt=""
                style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
              />
            )}
            <CardContent className="bg-[#030712]">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingBottom: "10px",
                }}
              >
                <div style={{ position: "relative" }}>
                  <img
                    onClick={isLiked ? handleUnlike : handleLike}
                    src={isLiked ? "/assets/unlike.gif" : "/assets/like.gif"}
                    alt=""
                    style={{ height: "25px", width: "25px", cursor: "pointer" }}
                  />
                  {likeCount  > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-16px",
                        left: "60%",
                        transform: "translateX(-50%)",
                        textAlign: "center",
                        fontSize: "11px",
                        color: "white",
                        display: "flex",
                      }}
                    >
                      <div> {likeCount }</div>{" "}
                      <div style={{ marginLeft: "2px" }}>
                        {likeCount  === 1 ? " like" : " likes"}
                      </div>
                    </div>
                  )}
                </div>

                <img
                  onClick={handleCommentClick}
                  src="/assets/comment.png"
                  alt=""
                  style={{
                    height: "20px",
                    width: "20px",
                    marginLeft: "4px",
                    cursor: "pointer",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  wordWrap: "break-word",
                  maxWidth: "270px",
                  paddingTop: "10px",
                }}
              >
                <div>
                  <strong
                    style={{ cursor: "pointer" }}
                  >
                    {post?.owner?.username}
                  </strong>{" "}
                  {post?.description}
                </div>
              </div>

              {post?.comments?.length > 0 && (
                <div
                  style={{ paddingTop: "10px", fontSize: "13px", cursor: "pointer" }}
                >
                  <p  onClick={handleCommentClick}>View {post?.comments?.length} comments</p>
                </div>
              )}
            </CardContent>
          </div>
          <div
              style={{
                flex: 1,
                overflow: "hidden",
              }}
            >
              {isCommentModalOpen && (
                <div
                  style={{ width: "100%", height: "100%", overflow: "hidden" }}
                >
                  <CommentModal
                    isOpen={isCommentModalOpen}
                    onClose={handleCloseCommentModal}
                    postId={post._id}
                    comments={post.comments}
                    postOwner={post.userId}
                  />
                </div>
              )}
            </div>

        </motion.div>
      </>
      )}
    </AnimatePresence>
  );
};

export default PostPreview;
