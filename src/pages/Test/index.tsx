import React from 'react';
import NotificationContainer from '../../components/common/NotificationContainer';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../redux/actions/notificationAction';
import { Button } from 'antd';

const Test: React.FC = () => {
    const dispatch = useDispatch();

    const triggerNotification = () => {
        dispatch(addNotification('Test notification', 'This is a test notification.', 5));
    };

    return (
        <div>
            <h1>Test</h1>
            <Button type="primary" onClick={triggerNotification}>
                Trigger Notification
            </Button>
            <NotificationContainer />
        </div>
    );
};

export default Test;
