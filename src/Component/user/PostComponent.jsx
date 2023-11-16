import React, { useEffect, useRef, useState } from "react";
import {
  CardContent,
  CardHeader,
  IconButton,
  Avatar,
  Typography,
  Input,
  Button,
} from "@mui/material";
import axios from "../../Axios/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setPost,
  PostOwnerDetails,
  likeLoading,
} from "../../Redux/Reducers/postReducer";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CommentModal from "./CommentModal";
import { motion, AnimatePresence } from "framer-motion";
import VideoPlayer from "./VideoPlayer";
import MoreOptionsModal from "./MoreOptionModal";

function PostComponent() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [usersData, setUsersData] = useState({});
  const [userLikedPosts, setUserLikedPosts] = useState({});
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [openedModals, setOpenedModals] = useState({});

  const userId = useSelector((store) => store.user?.userData?.payload?.userId);

  const handleOpenModal = (postId) => {
    setOpenedModals((prev) => ({ ...prev, [postId]: true }));
  };

  const handleCloseModal = (postId) => {
    setOpenedModals((prev) => ({ ...prev, [postId]: false }));
  };

  const handleCommentClick = (postId) => {
    console.log("Clicked on post:", postId);
    setSelectedPostId(postId);
    setCommentModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    console.log("Closing comment modal");
    setCommentModalOpen(false);
    setSelectedPostId(null);
    fetchPosts(); // Update the posts and comments count when the modal is closed
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

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          relativeTime: getRelativeTime(post.createdAt),
        }))
      );
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
      console.error("Error liking post:", error);
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
      console.error("Error unliking post:", error);
    }
  };

  return (
    <div className="post-container" style={{ position: "relative" }}>
      {posts.length === 0 ? (
        <>
          <h6
            style={{
              variant: "body2",
              textAlign: "center",
              marginTop: "200px",
              color: "white",
              fontWeight: "bold",
              fontSize: "36px",
            }}
          >
            No posts to show
          </h6>
          <h6
            style={{
              variant: "body2",
              textAlign: "center",
              marginTop: "10px",
              color: "white",
              fontWeight: "bold",
              fontSize: "36px",
            }}
          >
            Follow some friends to see their posts
          </h6>
        </>
      ) : (
        posts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.01, zIndex: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              position: "relative",
              // or 'block'
            }}
          >
            <div
              style={{
                padding: "1.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#37474F",
                  color: "#ECEFF1",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "3px solid #083344",
                }}
              >
                <CardHeader
                  className="bg-[#030712] "
                  avatar={
                    <Avatar
                      src={
                        usersData[post.userId]?.dp || "/assets/man-avatar.webp"
                      }
                      alt={usersData[post.userId]?.username}
                    />
                  }
                  title={usersData[post.userId]?.username}
                  subheader={
                    <span style={{ color: "white" }}>
                      {getRelativeTime(post.createdAt)}
                    </span>
                  }
                  action={
                    <>
                      <IconButton
                        aria-label="options"
                        style={{ color: "white" }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenModal(post._id);
                        }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                      <MoreOptionsModal
                        isOpen={openedModals[post._id] || false}
                        onClose={() => handleCloseModal(post._id)}
                        postOwner={usersData[post.userId]}
                      />
                    </>
                  }
                />
                {post.post[0].includes("video") ? (
                  // If post is a video
                  <VideoPlayer url={post.post[0]} />
                ) : (
                  // If post is an image
                  <img
                    src={post.post[0]}
                    alt=""
                    style={{ width: "320px", height: "340px" }}
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
                        onClick={() => {
                          const isLiked = userLikedPosts[post._id];
                          isLiked
                            ? handleUnLike(post._id)
                            : handleLike(post._id);
                          // Toggle the liked state
                          setUserLikedPosts((prevLiked) => ({
                            ...prevLiked,
                            [post._id]: !isLiked,
                          }));
                        }}
                        src={
                          userLikedPosts[post._id]
                            ? "/assets/unlike.gif"
                            : "/assets/like.gif"
                        }
                        alt=""
                        style={{ height: "25px", width: "25px" }}
                      />
                      {post.likes.length > 0 && (
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
                          <div> {post.likes.length}</div>{" "}
                          <div style={{ marginLeft: "2px" }}>
                            {post.likes.length === 1 ? " like" : " likes"}
                          </div>
                        </div>
                      )}
                    </div>

                    <img
                      onClick={() => handleCommentClick(post._id)}
                      src="/assets/comment.png"
                      alt=""
                      style={{
                        height: "20px",
                        width: "20px",
                        marginLeft: "4px",
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
                      <strong>{usersData[post.userId]?.username}</strong>{" "}
                      {post.description}
                    </div>
                  </div>

                  {post.comments.length > 0 && (
                    <div
                      onClick={() => handleCommentClick(post._id)}
                      style={{ paddingTop: "10px", fontSize: "13px" }}
                    >
                      <p>View {post?.comments?.length} comments</p>
                    </div>
                  )}
                </CardContent>
              </div>
            </div>

            <AnimatePresence>
              {isCommentModalOpen && selectedPostId === post._id && (
                <motion.div
                  initial={{ opacity: 0, height: 0, top: "100%" }}
                  animate={{ opacity: 1, height: "100%", top: 0 }}
                  exit={{ opacity: 0, height: 0, top: "100%" }} // Set the exit top value to 0
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <CommentModal
                    isOpen={isCommentModalOpen}
                    onClose={handleCloseCommentModal}
                    postId={selectedPostId}
                    comments={post.comments}
                    postOwner={post.userId}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))
      )}
    </div>
  );
}

export default PostComponent;
