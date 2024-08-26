import { combineReducers, createStore } from 'redux';
import notificationReducer, { NotificationState } from './reducers/notificationReducer';
import AuthReducer, { authState } from './reducers/auth';
import FoldReducer, { foldState } from './reducers/foldSider';
import CurrentUserReducer, { currentUserState } from './reducers/currentUser';
import SocketReducer, { socketState } from './reducers/socket';

export interface RootState {
    notification: NotificationState;
    auth: authState;
    fold: foldState;
    currentUser: currentUserState;
    socket: socketState;
}

const rootReducer = combineReducers({
    notification: notificationReducer,
    auth: AuthReducer,
    fold: FoldReducer,
    currentUser: CurrentUserReducer,
    socket: SocketReducer
});

const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
export default store;