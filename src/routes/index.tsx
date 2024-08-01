// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
import LoginPage from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Register from "../pages/Register";

export const routes = [
    {
        path: '/',
        element: <LoginPage />
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />
    },
    {
        path: '/register',
        element: <Register />
    }
];
