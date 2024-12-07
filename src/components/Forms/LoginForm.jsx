import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link,useNavigate } from 'react-router-dom'
import authService from '../../appWrite/services/authService'
import dataService from '../../appWrite/services/dataService'
import { useDispatch } from 'react-redux'
import { login } from '../../store/authSlice'
import { loadPosts } from '../../store/postSlice'
import {Input,Logo,Button} from "../index"


function LoginForm() {
    const  {register,handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error,setError]= useState("");

    // function to login the user on form submission 
    const loginUser = async (data)=>{
        
          try {
            const loggedIn = await authService.login(data);
          if(loggedIn){
            // if the user login is successful , fetch the user details and change the state in the store 
             const userData = await authService.getUserInfo();
             if(userData){
                // if userdata is available change the state 
                dispatch(login(userData));
                const posts =  await dataService.getAllPosts();
                console.log(posts)
                if(posts.documents.length>0){
                    dispatch(loadPosts(posts.documents));
                }
                navigate("/");
             }
          }
          } catch (error) {
            setError(error.message);
            console.log(error);
            
          }
    }
    // console.log(error)
  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(loginUser)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default LoginForm