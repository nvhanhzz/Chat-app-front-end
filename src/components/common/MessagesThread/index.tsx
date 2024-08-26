import React from 'react';
import "./messages-thread.scss";
import { useNavigate } from 'react-router-dom';

export interface MessagesThreadProps {
    roomId: string,
    avatar: string;
    title: string;
    lastMessage: string;
    lastMessageAt: string; // ISO string hoặc timestamp
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

const MessagesThread: React.FC<MessagesThreadProps> = ({ roomId, avatar, title, lastMessage, lastMessageAt }) => {
    const timeAgo = formatTimeAgoShort(new Date(lastMessageAt));
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`${roomId}`);
    }

    return (
        <div className='messages-thread' onClick={handleClick}>
            <div className='messages-thread__avatar'>
                <img src={avatar} alt={`${title}'s avatar`} />
            </div>
            <div className='messages-thread__details'>
                <div className='messages-thread__details--name'>{title}</div>
                <div className='messages-thread__details--last-message'>
                    <div className='messages-thread__details--last-message-content'>{lastMessage}</div>
                    <span className='messages-thread__details--last-message-time'>• {timeAgo}</span>
                </div>
            </div>
        </div>
    );
}

export default MessagesThread;
