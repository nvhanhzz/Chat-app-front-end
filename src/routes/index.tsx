import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import LayoutDefault from '../layouts/LayoutDefault';
import LoginPage from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Register from '../pages/Register';
import Test from '../pages/Test';
import PrivateRoute from '../components/common/PrivateRoute';
import { useAuth } from './useAuth';
import Home from '../pages/Home';
import Friend from '../pages/Friend';
import Messages from '../pages/Messages';

interface RouteType {
    path: string;
    element: React.ReactElement;
    children?: RouteType[];
}

const AuthRoutes: RouteType[] = [
    {
        path: '/',
        element: <LoginPage />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '*',
        element: <LoginPage />,
    },
];

const DefaultRoutes: RouteType[] = [
    {
        path: '/test',
        element: <PrivateRoute element={Test} />,
    },
    {
        path: '/',
        element: <PrivateRoute element={Home} />,
    },
    {
        path: '/friends',
        element: <PrivateRoute element={Friend} />,
    },
    {
        path: '/messages',
        element: <PrivateRoute element={Messages} />,
    },
    {
        path: '*',
        element: <Home />,
    },
];

export const routes = () => {
    const isLoggedIn = useAuth();

    return [
        {
            path: '/',
            element: isLoggedIn ? <LayoutDefault /> : <AuthLayout />,
            children: isLoggedIn
                ? DefaultRoutes
                : AuthRoutes,
        },
    ];
};