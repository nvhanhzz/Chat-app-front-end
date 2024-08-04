import { combineReducers, createStore } from 'redux';
import notificationReducer, { NotificationState } from './reducers/notificationReducer';
import AuthReducer, { authState } from './reducers/auth';

export interface RootState {
    notification: NotificationState;
    auth: authState
}

const rootReducer = combineReducers({
    notification: notificationReducer,
    auth: AuthReducer
});

const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
export default store;