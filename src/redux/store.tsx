import { combineReducers, createStore } from 'redux';
import notificationReducer, { NotificationState } from './reducers/notificationReducer';
import AuthReducer, { authState } from './reducers/auth';
import FoldReducer, { foldState } from './reducers/foldSider';

export interface RootState {
    notification: NotificationState;
    auth: authState;
    fold: foldState
}

const rootReducer = combineReducers({
    notification: notificationReducer,
    auth: AuthReducer,
    fold: FoldReducer
});

const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
export default store;