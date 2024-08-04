import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import { RootState } from '../../redux/store';
import { removeNotification } from '../../redux/actions/notificationAction';

const NotificationContainer: React.FC = () => {
    const dispatch = useDispatch();
    const notifications = useSelector((state: RootState) => state.notification.notifications);

    useEffect(() => {
        notification.destroy();

        notifications.forEach((notificationData: { message: string; description: string; duration: number; }, index: number) => {
            notification.open({
                message: notificationData.message,
                description: notificationData.description,
                duration: notificationData.duration,
                onClose: () => dispatch(removeNotification(index)),
            });
        });
    }, [notifications, dispatch]);

    return null;
};

export default NotificationContainer;