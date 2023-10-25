import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  mode: "light",
  chat:false,
  userLoading:false,
  blockLoading:false
};


const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
   
  },
});


export const { setMode} = theme.actions;
export default theme.reducer ;
