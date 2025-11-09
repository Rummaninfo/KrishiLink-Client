import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import AllCrops from "../Pages/AllCrops";
import Login from "../Form/Login";
import Register from "../Form/Register";
import NotFound from "../Pages/NotFound";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>, 
    children: [
       {
        index: true,
        path: "/home",
        element: <Home></Home>, 
        loader: ()=> fetch("http://localhost:9000/allcrops")
       }, 
       {
        path: "/all-crops", 
        element: <AllCrops></AllCrops> 
        
       }, 
       {
        path: "/login", 
        element: <Login></Login>
       }, 
       {
        path: "/register", 
        element: <Register></Register>
       }, 
       {
        path: "*", 
        element: <NotFound></NotFound>
       }

    ]
  },
]);