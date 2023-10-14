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
  
}
});



export const { setAdmin} = adminAuth.actions;
export default  adminAuth.reducer;