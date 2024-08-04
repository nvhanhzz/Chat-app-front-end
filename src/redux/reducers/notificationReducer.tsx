import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/notificationAction';

export interface Notification {
    message: string;
    description: string;
    duration: number;
}

export interface NotificationState {
    notifications: Notification[];
}

const initialState: NotificationState = {
    notifications: [],
};

const notificationReducer = (state = initialState, action: any): NotificationState => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, action.payload],
            };
        case REMOVE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter((_, index) => index !== action.payload),
            };
        default:
            return state;
    }
};

export default notificationReducer;