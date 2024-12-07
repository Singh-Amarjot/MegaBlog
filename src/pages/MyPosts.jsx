import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import Container from '../components/Container';
function MyPosts() {
    const [posts,setPosts] = useState([]);

    const postsData = useSelector(state=>state.postSlice.posts);
// here as we need to filter the post data as per the user id so we need userData as well 
const userData = useSelector(state=>state.auth.userData);

    useEffect(()=>{
         if(postsData.length>0){
            const myPosts = postsData.filter((post)=>post.userId==userData.$id);
            // console.log(postsData)
            // console.log(myPosts)
            if(myPosts.length>0){
                setPosts(myPosts);
            }else{
                setPosts([]);
            }
           
         }else{
            setPosts([]);
         }
    },[postsData])
    return (
        <div>
            <Container>
                <div className ="flex flex-wrap">
                    
                      {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                          {/* {console.log(post)} */}
                            <PostCard {...post} />
                        </div>
                    ))}
                    
                </div>
            </Container>
        </div>
      )
}

export default MyPosts