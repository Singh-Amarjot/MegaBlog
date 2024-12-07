import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../store/authSlice"
import postSlice from "../store/postSlice"

const store = configureStore({
    reducer:{
       auth :authSlice,
       postSlice:postSlice
    }
})

export default store ;
