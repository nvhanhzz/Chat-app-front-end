import React, { useEffect, useState } from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Button, Popover, Menu, Badge, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import getSocket from '../../../utils/socket';
import { getNotification } from '../../../services/NotificationService';
import './notification-header.scss';

type TypeShowNtf = 'un_read' | 'all';

interface User {
    _id: string;
    fullName: string;
    avatar: string;
}

interface Notification {
    _id: string;
    senderId: User;
    receiverId: User;
    type: string;
    isRead: boolean;
    linkTo?: string;
    deleted: boolean;
    createdAt: Date;
}

const NotificationHeader: React.FC = () => {
    const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
    const [displayedNotifications, setDisplayedNotifications] = useState<Notification[]>([]);
    const [filterType, setFilterType] = useState<TypeShowNtf>('un_read');

    const chooseNotification = (type: TypeShowNtf) => {
        setFilterType(type);
        setDisplayedNotifications(
            type === 'un_read'
                ? allNotifications.filter(notification => !notification.isRead)
                : allNotifications
        );
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await getNotification();
                if (response.ok) {
                    const result: Notification[] = (await response.json()).notifications;
                    setAllNotifications(result);
                    setDisplayedNotifications(result.filter(notification => !notification.isRead));
                } else {
                    console.error('Failed to fetch notifications:', response.status);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();

        const socket = getSocket();

        socket.on("SERVER_EMIT_RECIVE_FRIEND_REQUEST", (data: { notification: Notification }) => {
            setAllNotifications((prevNotifications) => [data.notification, ...prevNotifications]);
            setDisplayedNotifications((prevNotifications) => [data.notification, ...prevNotifications]);
        });

        return () => {
            socket.off("SERVER_EMIT_RECIVE_FRIEND_REQUEST");
        };
    }, []);

    const content = (
        <div className="notification-dropdown">
            <div className='notification-header__top'>
                <span>Thông báo</span>
                <Link to="#">Xem tất cả</Link>
            </div>
            <div className='notification-header__buttons'>
                <button
                    onClick={() => chooseNotification('un_read')}
                    className={filterType === 'un_read' ? 'active' : ''}
                >
                    Chưa đọc
                </button>
                <button
                    onClick={() => chooseNotification('all')}
                    className={filterType === 'all' ? 'active' : ''}
                >
                    Tất cả
                </button>
            </div>
            <Menu className="notification-menu">
                <Menu.Divider />
                {displayedNotifications.length > 0 ? (
                    displayedNotifications.map((notification) => (
                        <Menu.Item key={notification._id} className={notification.isRead ? '' : 'unread'}>
                            <div className="notification-item">
                                <Avatar src={notification.senderId.avatar} />
                                <div className="notification-content">
                                    <strong>{notification.senderId.fullName} </strong>
                                    {notification.type === "LIKE" ?
                                        "đã thích bài viết của bạn" :
                                        notification.type === "COMMENT" ?
                                            "đã bình luận về bài viết của bạn" :
                                            "đã gửi một yêu cầu kết bạn"}
                                </div>
                            </div>
                        </Menu.Item>
                    ))
                ) : (
                    <Menu.Item disabled>Không có thông báo</Menu.Item>
                )}
            </Menu>
        </div>
    );

    return (
        <Popover content={content} trigger="click" placement="bottomRight">
            <Button
                className='notification-list'
                type='text'
                icon={<BellOutlined />}
            >
                <span className="badge-container">
                    <Badge count={allNotifications.filter(notification => !notification.isRead).length} />
                </span>
            </Button>
        </Popover>
    );
};

export default NotificationHeader;