import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj }) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          {isLoggedIn && <Navigation />}
          {isLoggedIn ? <Home userObj={userObj} /> : <Auth />}
        </div>
      ),
    },
    {
      path: "/profile",
      element: (
        <div>
          {isLoggedIn && <Navigation />}
          <Profile />
        </div>
      ),
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRouter;
