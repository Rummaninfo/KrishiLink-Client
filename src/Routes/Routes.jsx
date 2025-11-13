import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import AllCrops from "../Pages/AllCrops";
import Login from "../Form/Login";
import Register from "../Form/Register";
import NotFound from "../Pages/NotFound";
import CropsDetails from "../Pages/CropsDetails";
import Privatepage from "../PrivateRoute/Privatepage";
import MyProfile from "../Pages/MyProfile";
import AddCrops from "../Pages/AddCrops";
import MyPost from "../Pages/MyPost";
import MyInterest from "../Pages/MyInterest";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>, 
    children: [
       {
        index: true,
       
        element: <Home></Home>, 
        loader: ()=> fetch("https://krishilink-server-one.vercel.app/allcrops")
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
        path: "/myprofile",
        element: <Privatepage>
          <MyProfile></MyProfile>
        </Privatepage>
       },
       {
        path: "/addcrops", 
        element: <AddCrops></AddCrops>
       },
       {
        path: "myposts", 
        element: <Privatepage>
          <MyPost></MyPost>
        </Privatepage>
        
       },
       {
          path:"myinterests", 
          element: <Privatepage>
            <MyInterest></MyInterest>
          </Privatepage>
       },
       {
        path:"/crops-details/:id", 
        element: <Privatepage>
          <CropsDetails></CropsDetails>


        </Privatepage>, 
        loader: ({params})=> fetch(`https://krishilink-server-one.vercel.app/allcrops/${params.id}`)
       },
       
       

    ]
    
  },
  {
        path: "*", 
        element: <NotFound></NotFound>
       }
]);