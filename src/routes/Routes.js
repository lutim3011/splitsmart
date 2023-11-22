import Signup from "components/Signup/Signup";
import Root from "./root";

export const siteRoutes = [
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];
