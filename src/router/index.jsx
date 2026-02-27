import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../views/Home";
import ActivityPage from "../views/ActivityPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "activities", 
        element: <ActivityPage />,
      },
    ],
  },
]);

export default router;