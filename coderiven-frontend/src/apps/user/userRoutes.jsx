import { lazy } from "react";

const SignIn = lazy(() => import("./auth/SignIn"));

const userRoutes = [
  // Post
  {
    path: "auth",
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
    ],
  },


];

export default userRoutes;
