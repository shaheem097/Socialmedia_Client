import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  following: [],
  followers: [],
  friendFollowing: [],
  friendFollowers: [],
  loading: false,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
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
} = followSlice.actions;
export default followSlice.reducer;
