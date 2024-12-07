import React, { useState } from 'react'
import {Input,Button,Logo} from "../index"
import authService from '../../appWrite/services/authService'
import { login } from '../../store/authSlice'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import dataService from '../../appWrite/services/dataService'
import { loadPosts } from '../../store/postSlice'

function SignupForm() {
    const {register,handleSubmit} = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error,setError]= useState("");

    // function to submit the form 
    const signup = async (data)=>{
        // try to create an account using the authService 
        
       try {
       
       
        const newUser = await authService.signup(data);
        if(newUser){
            // if the account creation was successful 
            // try to get the user info and redirect the user to the home page 
            const userData = await authService.getUserInfo();
            if(userData){
                // if userInfo received ., change the reducx state and redirect the user 
                dispatch(login(userData));
               
                const posts = await dataService.getAllPosts();
                // console.log(posts)
                if(posts.documents.length>0){
                    dispatch(loadPosts(posts.documents));
                }
                navigate("/");
            }else{
                setError("failed to signup ");
            }

        }
       } catch (error) {
        // console.log(error);
        setError(error.message)
       }

        }
    
  return (
    <div className="flex items-center justify-center">
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
    <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign In
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(signup)}>
            <div className='space-y-5'>
                <Input
                label="Full Name: "
                placeholder="Enter your full name"
                {...register("name", {
                    required: true,
                })}
                />
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
                    required: true,})}
                />
                <Button type="submit" className="w-full">
                    Create Account
                </Button>
            </div>
        </form>
    </div>

</div>
  )
}

export default SignupForm