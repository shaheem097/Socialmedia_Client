import { createSlice } from "@reduxjs/toolkit";



const registerSlice=createSlice({
    name :'register',
    initialState:{
        userData:{}
    },

    reducers:{
        setUserdata:(state,action)=>{
            console.log(action.payload,"redux data cominggggg");
            state.userData=action.payload
        }
    }

})

export const{
    setUserdata
}=registerSlice.actions;

export default registerSlice.reducer