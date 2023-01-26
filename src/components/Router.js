import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  const router = createBrowserRouter([
    {
      // ${process.env.PUBLIC_URL}
      path: `${process.env.PUBLIC_URL}/`,
      element: (
        <div>
          {isLoggedIn && <Navigation userObj={userObj} />}
          {isLoggedIn ? <Home userObj={userObj} /> : <Auth />}
        </div>
      ),
    },
    {
      path: "/profile",
      element: (
        <div>
          {isLoggedIn && <Navigation userObj={userObj} />}
          <Profile refreshUser={refreshUser} userObj={userObj} />
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
