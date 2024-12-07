import React from 'react'
import authService from '../../appWrite/services/authService'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice';
import { flushPosts } from '../../store/postSlice';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    // here we need to create a logout button component which upon being clicked will log the user out and will flush all the user and post data present in the store 
// creating a dispatch 
const dispatch = useDispatch();
const navigate = useNavigate();
// creating a handler 
const logoutHandler = (e)=>{
     authService.logout();
       // once the user is logged out 
        // flush out all the user and post data 
        dispatch(logout());
        dispatch(flushPosts());
       navigate("/")
}
  return (
    <button
        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}
        >Logout</button>
  )
}

export default LogoutBtn;