import React, { useEffect, useState } from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Button, Popover, Menu, Badge, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import getSocket from '../../../utils/socket';
import { getNotification, patchMarkNotificationAsRead } from '../../../services/NotificationService';
import './notification-header.scss';
import { User } from '../AddFriend';

type TypeShowNtf = 'un_read' | 'all';

export type Notification = {
    _id: string;
    senderId: User;
    receiverId: User;
    type: string;
    isRead: boolean;
    linkTo: string;
    deleted: boolean;
    createdAt: Date;
}

const NotificationHeader: React.FC = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
    const [displayedNotifications, setDisplayedNotifications] = useState<Notification[]>([]);
    const [filterType, setFilterType] = useState<TypeShowNtf>('un_read');

    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const getNotificationMessage = (type: string) => {
        const messages: { [key: string]: string } = {
            like: "đã thích bài viết của bạn",
            comment: "đã bình luận về bài viết của bạn",
            friend_request: "đã gửi một yêu cầu kết bạn",
            accept_friend: "đã chấp nhận lời mời kết bạn"
        };
        return messages[type] || "";
    };

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

        const receiveFriendRequest = (data: { notification: Notification }) => {
            setAllNotifications((prevNotifications) => [data.notification, ...prevNotifications]);
            setDisplayedNotifications((prevNotifications) => [data.notification, ...prevNotifications]);
        }

        const reciveAcceptFriend = (data: { notification: Notification }) => {
            setAllNotifications((prevNotifications) => [data.notification, ...prevNotifications]);
            setDisplayedNotifications((prevNotifications) => [data.notification, ...prevNotifications]);
        }

        const reciveCancelFriendRequest = (data: { notification: Notification }) => {
            setAllNotifications(prevNotifications =>
                prevNotifications.filter(item => item._id !== data.notification._id)
            );
            setDisplayedNotifications(prevDisplayedNotifications =>
                prevDisplayedNotifications.filter(item => item._id !== data.notification._id)
            );
        }

        const socket = getSocket();
        socket.on("SERVER_EMIT_RECIVE_FRIEND_REQUEST", receiveFriendRequest);
        socket.on("SERVER_EMIT_RECIVE_ACCEPT_FRIEND", reciveAcceptFriend);
        socket.on("SERVER_EMIT_RECIVE_CANCEL_FIEND_REQUEST", reciveCancelFriendRequest);

        return () => {
            socket.off("SERVER_EMIT_RECIVE_FRIEND_REQUEST", receiveFriendRequest);
            socket.off("SERVER_EMIT_RECIVE_ACCEPT_FRIEND", reciveAcceptFriend);
            socket.off("SERVER_EMIT_RECIVE_CANCEL_FIEND_REQUEST", reciveCancelFriendRequest);
        };
    }, []);

    const handleNotificationClick = async (notification: Notification) => {
        if (!notification.isRead) {
            try {
                const response = await patchMarkNotificationAsRead({ notificationId: notification._id });
                if (response.ok) {
                    setAllNotifications((prevNotifications) =>
                        prevNotifications.map((item) =>
                            item._id === notification._id ? { ...item, isRead: true } : item
                        )
                    );

                    setDisplayedNotifications((prev) =>
                        filterType === 'un_read'
                            ? prev.filter((item) => item._id !== notification._id)
                            : prev.map((item) =>
                                item._id === notification._id ? { ...item, isRead: true } : item
                            )
                    );

                } else {
                    const errorData = await response.json();
                    console.error('Error marking notification as read:', errorData.message || 'Unknown error');
                }
            } catch (error) {
                console.error('Error marking notification as read:', error);
            }
        }

        hide();
        navigate(notification.linkTo);
    }

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
                        <Menu.Item
                            key={notification._id}
                            className={notification.isRead ? 'read' : 'unread'}
                            onClick={() => handleNotificationClick(notification)}
                        >
                            <div className="notification-item">
                                <Avatar src={notification.senderId.avatar} />
                                <div className="notification-content">
                                    <strong>{notification.senderId.fullName} </strong>
                                    {getNotificationMessage(notification.type)}
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
        <Popover
            content={content}
            trigger="click"
            placement="bottomRight"
            open={open}
            onOpenChange={handleOpenChange}
        >
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