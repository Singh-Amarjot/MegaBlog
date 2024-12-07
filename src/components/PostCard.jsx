import React, { useEffect } from 'react'
import dataService from '../appWrite/services/dataService';
import { Link } from 'react-router-dom'
import { useState } from 'react';
function PostCard({$id,featuredImage,title}) {
 const [imageUrl,setImageUrl] = useState('post image');

 useEffect(()=>{
     dataService.getFilePreview(featuredImage).then((url)=>{
      // console.log(url)
        setImageUrl(url);
     })
 },[featuredImage])

//  console.log(imageUrl);
  return (
    <Link to={`/post/${$id}`}>
       <div className='w-full bg-gray-100 rounded-xl p-4'>
    <div className='w-full flex justify-center mb-4'>
        <div className='w-full aspect-video'> {/* 16:9 aspect ratio */}
            <img 
                src={imageUrl} 
                alt={title}
                className='w-full h-full object-cover rounded-xl'
            />
        </div>
    </div>

            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard