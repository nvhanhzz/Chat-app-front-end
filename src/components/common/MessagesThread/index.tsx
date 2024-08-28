import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from '../../../redux/actions/currentUser';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Badge } from 'antd';
import './messages-thread.scss';

export interface LastMessage {
    content: string;
    createAt: string;
    userId: string;
}

export interface MessagesThreadProps {
    roomId: string;
    avatar: string;
    type: 'one-to-one' | 'group';
    title: string;
    isOnline: boolean;
    lastOnline: Date;
    lastMessage: LastMessage;
}

const formatTimeAgoShort = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears > 0) return `${diffInYears} y`;
    if (diffInMonths > 0) return `${diffInMonths} mo`;
    if (diffInWeeks > 0) return `${diffInWeeks} w`;
    if (diffInDays > 0) return `${diffInDays} d`;
    if (diffInHours > 0) return `${diffInHours} h`;
    if (diffInMinutes > 0) return `${diffInMinutes} m`;
    return 'Just now';
};

const MessagesThread: React.FC<MessagesThreadProps> = ({ roomId, avatar, title, isOnline, lastMessage }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const currentUserState = useSelector((state: RootState) => state.currentUser);
    if (!currentUserState || !currentUserState.user) {
        return <div>Loading...</div>;
    }
    const currentUser: User = currentUserState.user;

    const currentRoomId = pathname.split('/').pop();

    const isActive = currentRoomId === roomId;

    const timeAgo = lastMessage.createAt ? "• " + formatTimeAgoShort(new Date(lastMessage.createAt)) : '';

    const handleClick = () => {
        navigate(`${roomId}`);
    }

    return (
        <div className={`messages-thread ${isActive ? 'active' : ''}`} onClick={handleClick}>
            <div className='messages-thread__avatar'>
                <img src={avatar} alt={`${title}'s avatar`} />
                {isOnline &&
                    <div className='messages-thread__avatar--online'>
                        <Badge status="success" text="" />
                    </div>
                }
            </div>
            <div className='messages-thread__details'>
                <div className='messages-thread__details--name'>{title}</div>
                <div className='messages-thread__details--last-message'>
                    <div className='messages-thread__details--last-message-content'>{lastMessage && lastMessage.content && (currentUser._id === lastMessage.userId ? 'Bạn: ' : '') + lastMessage.content}</div>
                    <span className='messages-thread__details--last-message-time'>{timeAgo}</span>
                </div>
            </div>
        </div>
    );
}

export default MessagesThread;