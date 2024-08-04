import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useEffect, useState } from 'react';
import { getCheckLoggedIn } from '../services/AuthService';
import { login, logout } from '../redux/actions/auth';

export const useAuthRoutes = () => {
    const dispatch = useDispatch();
    const isLoggedInFromStore = useSelector((state: RootState) => state.auth.isLoggedIn);
    const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInFromStore);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const response = await getCheckLoggedIn();
            if (response.status === 200) {
                setIsLoggedIn(true);
                dispatch(login());
            } else {
                setIsLoggedIn(false);
                dispatch(logout());
            }
        };

        checkLoggedIn();
    }, [dispatch, isLoggedInFromStore]);

    return isLoggedIn;
};