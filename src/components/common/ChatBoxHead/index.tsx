import React from 'react';
import { Badge, Button } from 'antd';
import { InfoCircleOutlined, LeftCircleOutlined } from '@ant-design/icons';
import "./chat-box-head.scss";
import { MessagesThreadProps } from '../MessagesThread';
import { useNavigate } from 'react-router-dom';

export interface ChatBoxHeadProps {
    roomChat: MessagesThreadProps; // Đảm bảo rằng props có thể là undefined
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
                <div className='chat-box-head__details--online'>
                    <Badge status="success" text="" />
                    Online
                </div>
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