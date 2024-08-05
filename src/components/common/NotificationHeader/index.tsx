import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import "./notification-header.scss";

const NotificationHeader: React.FC = () => {
    return (
        <div className='notification-list'>
            <BellOutlined />
        </div>
    );
}

export default NotificationHeader;