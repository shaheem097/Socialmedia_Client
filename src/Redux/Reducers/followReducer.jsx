import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  following: [],
  followers: [],
  friendFollowing: [],
  friendFollowers: [],
  loading: false,
  userFollowState: [],
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const userId = action.payload?.userData?.payload?.userId;

      // Initialize userFollowState if not present
      if (!state.userFollowState[userId]) {
        state.userFollowState[userId] = false;
      }

      state.user = action.payload;
    },
    toggleFollow: (state, action) => {
      const { userId } = action.payload;
      state.userFollowState[userId] = !state.userFollowState[userId];
    },
    setFollowers: (state, action) => {
      if (state.user) {
        state.user.followers = action.payload?.followers;
        state.followers = action.payload?.followers;
      } else {
        console.error("user friends non-existent");
      }
    },
    setFriendFollowers: (state, action) => {
      state.friendFollowers = action.payload?.followers;
    },
    setFriendFollowing: (state, action) => {
      state.friendFollowing = action.payload?.following;
    },
    setFollowing: (state, action) => {
      if (state.user) {
        state.user.following = action.payload?.following;
        state.following = action.payload?.following;
      } else {
        console.error("user friends non-existent");
      }
    },
    followLoading: (state) => {
      state.loading = !state.loading;
    },
    clearUserLogout: () => null,
  },
});


export const {
  setUser,
  followLoading,
  setFollowers,
  setFriendFollowers,
  setFriendFollowing,
  setFollowing,
  clearUserLogout,
  toggleFollow
} = followSlice.actions;
export default followSlice.reducer;
