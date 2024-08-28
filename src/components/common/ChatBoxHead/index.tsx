import React from 'react';
import { Badge, Button } from 'antd';
import { InfoCircleOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { MessagesThreadProps } from '../MessagesThread';
import { useNavigate } from 'react-router-dom';
import "./chat-box-head.scss";

export interface ChatBoxHeadProps {
    roomChat: MessagesThreadProps;
}

function timeSince(date: Date): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return `${interval} năm trước`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return `${interval} tháng trước`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return `${interval} ngày trước`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return `${interval} giờ trước`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return `${interval} phút trước`;
    }
    return `vài giây trước`;
}

const ChatBoxHead: React.FC<ChatBoxHeadProps> = ({ roomChat }) => {
    const navigate = useNavigate();

    if (!roomChat) {
        return <div>Room not found</div>;
    }

    const handleClick = () => {
        navigate("/messages");
    }

    return (
        <div className='chat-box-head'>
            <Button
                type="text"
                className='chat-box-head__back-button'
                icon={<LeftCircleOutlined />}
                onClick={() => handleClick()}
            />

            <div className='chat-box-head__avatar'>
                <img src={roomChat.avatar || "https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg"} alt='avatar' />
            </div>
            <div className='chat-box-head__details'>
                <div className='chat-box-head__details--name'>{roomChat.title}</div>
                {roomChat.type === 'one-to-one' && (
                    roomChat.isOnline ? (
                        <div className='chat-box-head__details--online'>
                            <Badge status="success" text="" />
                            Đang hoạt động
                        </div>
                    ) : (
                        <div className='chat-box-head__details--last-online'>
                            Hoạt động {timeSince(new Date(roomChat.lastOnline))}
                        </div>
                    )
                )}

            </div>

            <Button
                type="text"
                className='chat-box-head__information-button'
                icon={<InfoCircleOutlined />}
            />
        </div>
    );
}

export default ChatBoxHead;