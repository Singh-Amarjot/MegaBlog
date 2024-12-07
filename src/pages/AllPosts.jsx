import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import Container from '../components/Container';

function AllPosts() {
    const [posts,setPosts] = useState([]);

    const postsData = useSelector(state=>state.postSlice.posts);

    useEffect(()=>{
         if(postsData.length>0){
            setPosts(postsData);
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

export default AllPosts