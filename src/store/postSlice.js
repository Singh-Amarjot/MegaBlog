import {createSlice} from "@reduxjs/toolkit"

// creating a post slice 

const initialState = {
    posts :[],
    isLoaded :false
}
const postSlice = createSlice({
   name : "postSlice",
   initialState,
   reducers:{
    loadPosts :(state,action)=>{
        // console.log(action.payload)
         state.posts =[...action.payload];
         state.isLoaded = true;
    },
    flushPosts:(state,action)=>{
        state.posts = [];
        state.isLoaded = false
    }
   }
})

// exporting the reducers and actions 
export default postSlice.reducer;
export const {loadPosts,flushPosts} = postSlice.actions;