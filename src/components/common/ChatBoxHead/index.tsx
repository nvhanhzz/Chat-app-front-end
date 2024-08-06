import React from 'react';
import { Badge, Button } from 'antd';
import { InfoCircleOutlined, LeftCircleOutlined } from '@ant-design/icons';
import "./chat-box-head.scss";

const ChatBoxHead: React.FC = () => {
    return (
        <div className='chat-box-head'>
            <Button
                type="text"
                className='chat-box-head__back-button'
                icon={<LeftCircleOutlined />}
            />

            <div className='chat-box-head__avatar'>
                <img src='https://enlink.themenate.net/assets/images/avatars/thumb-1.jpg' alt={'avatar'} />
            </div>
            <div className='chat-box-head__details'>
                <div className='chat-box-head__details--name'>Erin Gonzales</div>
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