import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const NotificationHeader: React.FC = () => {
    return (
        <Button className='notification-list'
            type='text'
            icon={<BellOutlined />}
        />
    );
}

export default NotificationHeader;