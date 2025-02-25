import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import About from "./components/about/About";


import {Navigate} from 'react-router-dom'
import CreateEvents from "./components/createevents/CreateEvents";
import UpComingEvents from "./components/upcomingevents/UpComingEvents";
import RootLayout from "./RootLayout";
import RoutingError from "./components/RoutingError";
import UserLoginStore from "./contexts/UserLoginStore";
import UserProfile from "./components/user-profile/User-Profile";
import YourEvents from "./components/yourevents/YourEvents";


function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      errorElement:<RoutingError />,
      children: [
        {
          path: "home",
          element: <Home />,
        },


        {
          path: "/",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path:"createevents",
          element:<CreateEvents/>
        },
        {
          path:"user-profile",
          element:<UserProfile/>
        },
        {
          path:"yourevents",
          element:<YourEvents/>
        },
        {
          path:'upcomingevents',
          element:<UpComingEvents />,
          children:[
           
            //navigate to Products component when page is empty
            {
              path:'home',
              element:<Navigate to={'home'} />
            }
          ]
        }
      ],
    },
  ]);


  return (
    <div className="main">
      <RouterProvider router={browserRouter} />
    </div>
  );
}


export default App;