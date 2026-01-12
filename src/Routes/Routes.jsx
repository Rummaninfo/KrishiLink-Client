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
// import AddCrops from "../Pages/AddCrops";
import MyPost from "../Pages/MyPost";
import MyInterest from "../Pages/MyInterest";
import Dashboard from "../Component/Dashboard/Dashboard";
import NewAdd from "../Component/Dashboard/DRoutes/NewAdd";
import Post from "../Component/Dashboard/DRoutes/Post";
import Interest from "../Component/Dashboard/DRoutes/Interest";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>, 
    children: [
       {
        index: true,
       
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
        path: "/myprofile",
        element: <Privatepage>
          <MyProfile></MyProfile>
        </Privatepage>
       },
      //  {
      //   path: "/addcrops", 
      //   element: <AddCrops></AddCrops>
      //  },
      //  {
      //   path: "myposts", 
      //   element: <Privatepage>
      //     <MyPost></MyPost>
      //   </Privatepage>
        
      //  },
      //  {
      //     path:"myinterests", 
      //     element: <Privatepage>
      //       <MyInterest></MyInterest>
      //     </Privatepage>
      //  },
       {
        path:"/crops-details/:id", 
        element: <Privatepage>
          <CropsDetails></CropsDetails>


        </Privatepage>, 
        loader: ({params})=> fetch(`http://localhost:9000/allcrops/${params.id}`)
       },
       
       

    ]
    
  },
  {
        path: "*", 
        element: <NotFound></NotFound>
       }, 
       {
        path: "dashboard", 
        element: <Dashboard></Dashboard>, 
        children: [
          {
            path: "add",
            element: <NewAdd></NewAdd>
          },
          {
            path: "post",
            element: <Post></Post> 
          },
          {
            path: "interest",
            element: <Interest></Interest> 
          },
        ]
        
       }
]);