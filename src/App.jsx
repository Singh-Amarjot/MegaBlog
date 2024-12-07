import { useEffect, useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import authService from './appWrite/services/authService'
import dataService from './appWrite/services/dataService'
import { login,logout } from './store/authSlice'
import { loadPosts,flushPosts } from './store/postSlice'
import { Header,Footer } from './components'

function App() {
  const [loading,setLoading ] = useState(true);
// first of all check if the user is logged in or not 
// for this try to get the current user 
const dispatch = useDispatch();

useEffect(()=>{
    // setting up redux store states 
    (async ()=>{
      try {
         const curUser = await authService.getUserInfo();
         if(curUser){
          // if the user is logged in 
          // load the user data  and the posts in the store and setloading to false 
          dispatch(login(curUser));

          const posts = await dataService.getAllPosts();
          // console.log(posts);
          if(posts.documents.length>0){
            dispatch(loadPosts(posts.documents))
          }
          

         }else{
          // if the user is not logged in , logout the user 
          // and erase the data in the store 
           dispatch(logout());
           dispatch(flushPosts());
         }
      } catch (error) {
        // console.log(error);
      }finally{
        setLoading(false);
      }
    })()
},[dispatch])

  return (
    !loading ? (
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
        <Header/>
          <main>
           
         
        
            <Outlet />
            
      
          </main>
          <Footer />
        </div>
      </div>
    ) : null
  )
}

export default App
