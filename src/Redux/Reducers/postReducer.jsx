import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  posts: [],
  loading: false,
  deleted:false,
  profile:false,
  comment:false,
  liked:false
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      // const updatedPosts = state.posts.map((post)=>{
      //   if(post._id==action.payload.post._id) return action.payload.post
      // })
      state.posts = action?.payload;
    },
    setUpdatedPost: (state, action) => {
      console.log(state.posts,'redux');
      const updatedPosts = state?.posts.map((post) => {
          if (post?._id === action.payload.post?._id) return action.payload.post;
          return post;
      });
      state.posts = updatedPosts;
  },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      state.posts = state?.posts?.payload.filter(
        (post) => post?._id !== postId
      );
    },
    deletedLoading:(state)=>{
      state.deleted = !state.deleted
    },
    profileLoading:(state)=>{
      state.deleted = !state.deleted
    },
    commentLoading:(state)=>{
      state.comment = !state.comment
    },
    likeLoading:(state)=>{
      state.liked = !state.liked
    }
  },
});

export const { setPost,setUpdatedPost,commentLoading,likeLoading, setLoading, deletePost,deletedLoading,profileLoading } = postSlice.actions;
export default postSlice.reducer ;
