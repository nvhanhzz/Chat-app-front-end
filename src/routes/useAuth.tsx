import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useEffect } from 'react';
import { getCheckLoggedIn, getCurrentUser } from '../services/AuthService';
import { login, logout } from '../redux/actions/auth';
import { setCurrentUser } from '../redux/actions/currentUser';
import getSocket from '../utils/socket';
import { openSocket } from '../redux/actions/socket';

export const useAuth = () => {
    const dispatch = useDispatch();
    const isLoggedInFromStore = useSelector((state: RootState) => state.auth.isLoggedIn);
    const isOpenSocket = useSelector((state: RootState) => state.socket.isOpen);
    const currentUser = useSelector((state: RootState) => state.currentUser);

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
                if (!isLoggedInFromStore) {
                    dispatch(login());
                }
                if (!isOpenSocket) {
                    dispatch(openSocket());
                    getSocket();
                }
                if (!currentUser) {
                    await setCurrentUserEffect();
                }
            } else {
                dispatch(logout());
            }
        };

        checkLoggedIn();
    }, [dispatch, isLoggedInFromStore]);

    return isLoggedInFromStore;
};