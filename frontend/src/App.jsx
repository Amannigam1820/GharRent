import HomePage from "./routes/homePage/HomePage"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import ListPage from "./routes/listPage/ListPage"
import Layout from "./routes/layout/Layout"
import SinglePage from "./routes/singlePage/SinglePage"
import Profile from "./routes/profile/Profile"
import Register from "./routes/register/Register"
import Login from "./routes/login/Login"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"
import axios from "axios"
import { userExists, userNotExist } from "./redux/reducer/auth"
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"
import AuthProtectedRoute from "./components/protectedRoute/authProtectedRoute"
import ProfileUpdate from "./routes/profileUpdatePage/ProfileUpdate"
import PostProperty from "./routes/PostPropertyPage/PostProperty"


function App() {
  const { user, loader } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    axios                             
      .get('http://localhost:8800/api/auth/me', {withCredentials:true})
      .then(({data}) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExist()));
  }, [dispatch]);


  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path:'/',
          element:<ProtectedRoute element={HomePage} />
        },
        {
          path:"/list",
          element:<ListPage/>
        },
        {
          path:"/:id",
          element:<SinglePage/>
        },
        {
          path:"/profile",
          element:<ProtectedRoute element={Profile} />
        },
        {
          path:"/login",
          element:<AuthProtectedRoute element={Login} />
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/profile/update",
          element:<ProtectedRoute element={ProfileUpdate} />
        },
        {
          path:"/add-property",
          element:<ProtectedRoute element={PostProperty} />
        }
      ]
    },
    
   
  ])
  

  return (
    
    <RouterProvider router={router}/>
  )
}

export default App
