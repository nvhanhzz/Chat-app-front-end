import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useEffect, useState } from 'react';
import { getCheckLoggedIn, getCurrentUser } from '../services/AuthService';
import { login, logout } from '../redux/actions/auth';
import { setCurrentUser } from '../redux/actions/currentUser';

export const useAuthRoutes = () => {
    const dispatch = useDispatch();
    const isLoggedInFromStore = useSelector((state: RootState) => state.auth.isLoggedIn);
    const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInFromStore);

    useEffect(() => {
        const setCurrentUserEffect = async () => {
            const response = await getCurrentUser();
            if (response.status === 200) {
                const result = await response.json();
                dispatch(setCurrentUser(result.user));
            } else {
                console.log(response);
            }
        }

        const checkLoggedIn = async () => {
            const response = await getCheckLoggedIn();
            if (response.status === 200) {
                setIsLoggedIn(true);
                dispatch(login());
                setCurrentUserEffect();

            } else {
                setIsLoggedIn(false);
                dispatch(logout());
            }
        };

        checkLoggedIn();
    }, [dispatch, isLoggedInFromStore]);

    return isLoggedIn;
};