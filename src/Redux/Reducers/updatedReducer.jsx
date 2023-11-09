import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: {},
  image:''
};

const updatedUser = createSlice({
  name: "singleUser",
  initialState,
  reducers: {
    setUpdatedDetails: (state, action) => {
        console.log(action.payload,"ffffffffffffffffffff");
        state.user = action.payload;
    },
    setImageProfile:(state,action)=>{
        console.log(action.payload,"gggggggggggggggggggg");
        state.image = action.payload
      }
  },
});



export const { setUpdatedDetails,setImageProfile } = updatedUser.actions;
export default updatedUser.reducer;
