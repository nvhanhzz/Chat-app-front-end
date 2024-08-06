import React from 'react';
import "./messages-thread.scss";

export interface MessagesThreadProps {
    avatar: string;
    name: string;
    lastMessage: string;
}

const MessagesThread: React.FC<MessagesThreadProps> = ({ avatar, name, lastMessage }) => {
    return (
        <div className='messages-thread'>
            <div className='messages-thread__avatar'>
                <img src={avatar} alt={`${name}'s avatar`} />
            </div>
            <div className='messages-thread__details'>
                <div className='messages-thread__details--name'>{name}</div>
                <div className='messages-thread__details--last-message'>{lastMessage}</div>
            </div>
        </div>
    );
}

export default MessagesThread;
