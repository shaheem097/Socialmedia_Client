import { createSlice } from "@reduxjs/toolkit";

const adminAuth = createSlice({
  name: "admin",
  initialState:{
       adminData: {}
  },
  reducers: {
    setAdmin: (state, action) => {
      console.log(action.payload,"{}{}{}{}{}{}{{}{");
      state.adminData = action.payload  
    },
    logoutAdmin: (state) => {
      localStorage.removeItem("adminAccessToken");

      state.adminData = {}; // Reset user data when logging out
  },

  
}
});



export const { setAdmin,logoutAdmin} = adminAuth.actions;
export default  adminAuth.reducer;