export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const addNotification = (message: string, description: string, duration: number) => ({
    type: ADD_NOTIFICATION,
    payload: { message, description, duration },
});

export const removeNotification = (index: number) => ({
    type: REMOVE_NOTIFICATION,
    payload: index,
});