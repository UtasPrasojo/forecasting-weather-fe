import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../views/Home";
import ActivityPage from "../views/ActivityPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Ini harus menjadi parent
    children: [
      {
        index: true, // Ini akan merender Dashboard saat di path "/"
        element: <Home />,
      },
      {
        path: "activities", // Pathnya menjadi /activities
        element: <ActivityPage />,
      },
    ],
  },
]);

export default router;