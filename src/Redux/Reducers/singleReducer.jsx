import { createSlice } from "@reduxjs/toolkit";

const singleUser=createSlice({
    name:"singleUser",
    initialState:{
        userData:{}  
    },
    reducers:{
        setUserDetails:(state,action)=>{
            console.log(action.payload,"ppppppppppppppppppppppppppppppppp");

            state.userData = action.payload
            console.log(state.userData,"dataaaaaaaaaaaaaaaaaaaa");
        },
          logoutUser: (state) => {
            localStorage.removeItem("userAccessToken");
            state.userData = {}; // Reset user data when logging out
        },
    }
});


  
  export const { setUserDetails,logoutUser} = singleUser.actions;
  export default singleUser.reducer ;
  
