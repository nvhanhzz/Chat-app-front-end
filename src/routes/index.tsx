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
import FriendPageContent from '../components/partials/FriendPageContent';
import AllFriend from '../components/partials/AllFriend';

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
        children: [
            {
                path: 'suggests',
                element: <PrivateRoute element={FriendPageContent} />
            },
            {
                path: 'requests',
                element: <PrivateRoute element={FriendPageContent} />
            },
            {
                path: 'sent-invites',
                element: <PrivateRoute element={FriendPageContent} />
            },
            {
                path: 'all-friends',
                element: <PrivateRoute element={AllFriend} />
            }
        ]
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