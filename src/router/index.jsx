import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../views/Home";
import ActivityPage from "../views/ActivityPage";
import Login from "../views/Login";
import Register from "../views/Register";
import { ProtectedRoute } from "./ProtectedRoute"; // Import komponen pelindung

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        // Rute ini sekarang diproteksi
        path: "activities",
        element: (
          <ProtectedRoute>
            <ActivityPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
