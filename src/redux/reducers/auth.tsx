import { LOGIN, LOGOUT } from '../actions/auth';

export interface authState {
    isLoggedIn: boolean;
}

const initialState: authState = {
    isLoggedIn: false,
};

const AuthReducer = (state = initialState, action: any): authState => {
    switch (action.type) {
        case LOGIN:
            return {
                isLoggedIn: true
            };
        case LOGOUT:
            return {
                isLoggedIn: false
            };
        default:
            return state;
    }
}

export default AuthReducer;