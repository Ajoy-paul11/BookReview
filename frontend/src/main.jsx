import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home.jsx";
import UserProfile from "./components/UserProfile.jsx";
import AddBookForm from "./components/AddBookForm.jsx";
import SingleBookDetails from "./components/SingleBookDetails.jsx";
import LoginForm from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";
import AuthProvider from "./userContext/AuthContext.jsx";
import UserUpdateForm from "./components/UserUpdateForm.jsx";
import ReviewForm from "./components/ReviewForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <UserProfile />,
      },
      {
        path: "/book/:id",
        element: (
          <ProtectedRoute>
            <SingleBookDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
      {
        path: "/users/:id",
        element: <UserUpdateForm />,
      },
      {
        path: "/reviews/:id",
        element: <ReviewForm />,
      },
    ],
  },
  {
    path: "protected/admin/add",
    element: <AddBookForm />,
  },
  {
    path: "/protected/admin",
    element: <AdminDashboard />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
