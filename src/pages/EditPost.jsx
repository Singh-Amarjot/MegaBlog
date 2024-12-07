import React from 'react'
import PostForm from '../components/Forms/PostForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Container } from '../components';

function EditPost() {
    // getting the data of the postfrom the store based on the past id 
    const {slug} = useParams();
    const [post,setPost] = useState({});
    const navigate = useNavigate();

    const postData = useSelector(state=>state.postSlice.posts);

    useEffect(()=>{
         if(!slug){
            navigate("/");
         }
         if(postData.length==0){
            navigate("/")
         }
         console.log(postData);
         // finding the exact post 
         const mypost = postData.find((post)=>post.$id===slug);
         if(!mypost){
            setPost({});
            navigate("/")
         }else{
            setPost(mypost)
         }
    },[postData,slug])
    return post? (
        <div className='py-8'>
            <Container>
                <PostForm post={{...post}}/>
            </Container>
        </div>
      ):null
}

export default EditPost