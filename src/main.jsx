import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './store/store.js'
import {Provider} from "react-redux"
import {Home,Login,Post, Signup} from './pages/index.js'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import AllPosts from './pages/AllPosts.jsx'
import MyPosts from './pages/MyPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import AuthLayout from './components/Protected.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>,

      },
      {
        path:'/login',
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path:"/signup",
        element: (
          <AuthLayout authentication={false}>
              <Signup />
          </AuthLayout>
      )
      },
      {
        path: "/all-posts",
        element: (
            <AuthLayout authentication>
                {" "}
                <AllPosts />
            </AuthLayout>
        ),
    },
    {
      path: "/my-posts",
      element: (
          <AuthLayout authentication>
              {" "}
              <MyPosts />
          </AuthLayout>
      ),
  },
    {
        path: "/add-post",
        element: (
            <AuthLayout authentication>
                {" "}
                <AddPost />
            </AuthLayout>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <AuthLayout authentication>
                {" "}
                <EditPost />
            </AuthLayout>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}>
    
    </RouterProvider>
    </Provider>
  </StrictMode>,
)
