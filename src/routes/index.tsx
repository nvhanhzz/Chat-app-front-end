// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
import LoginPage from "../pages/Login";

export const routes = [
    {
        path: '/',
        element: <LoginPage />,
        children: [
        ]
    }
];
