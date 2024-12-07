import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Container from "../components/Container"
import PostCard from '../components/PostCard';



function Home() {
    // there are two scenarios either the user is logged in or not 
    // if the user is logged in , it means there will be user info and posts available in the redux store 
     const [ posts,setPosts] = useState([]);

    
          const postsData = useSelector(state => state.postSlice.posts);
          

          useEffect(()=>{
                  if(postsData.length!=0){
                    setPosts(postsData)
                  }else{
                    setPosts([]);
                  }
          },[postsData,useSelector])
    
        //   console.log(posts);

     if (posts==[] || posts.length === 0 ) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts to show ! please make sure you are logged In
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }else{
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {
                            posts.map((post)=>(
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard {...post}></PostCard>
                                </div>
                            ))
                        }
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home