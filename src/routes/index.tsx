import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import LayoutDefault from '../layouts/LayoutDefault';
import LoginPage from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Register from '../pages/Register';
import Test from '../pages/Test';
import PrivateRoute from '../components/common/PrivateRoute';
import { useAuthRoutes } from './useAuthRoutes';

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
];

const DefaultRoutes: RouteType[] = [
    {
        path: '/test',
        element: <PrivateRoute element={Test} />,
    },
    // Các routes khác yêu cầu đăng nhập
];

export const routes = () => {
    const isLoggedIn = useAuthRoutes();

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