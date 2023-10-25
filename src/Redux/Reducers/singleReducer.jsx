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
        }
    }
});


  
  export const { setUserDetails} = singleUser.actions;
  export default singleUser.reducer ;
  
