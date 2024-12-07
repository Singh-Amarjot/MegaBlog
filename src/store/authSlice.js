import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated :false,
    userData:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login :(state,action)=>{
           // upon login change the authentication status and save the user data
           state.isAuthenticated= true;
           state.userData = action.payload;
        },
        logout:(state,action)=>{
              // upon logout // change the authentication status to false and also nullify the userdata
              state.isAuthenticated = false;
              state.userData = null;
        }
    }
})

// exporting the reducers and actions 

export default authSlice.reducer;
export const {login,logout}  = authSlice.actions;