import React, { useEffect, useState } from 'react';
import SearchMessagesThread from '../../components/common/SearchMessagesThread';
import MessagesThread, { MessagesThreadProps } from '../../components/common/MessagesThread';
import "./messages.scss";
import { getMessageThreads } from '../../services/ChatService';
import { Outlet } from 'react-router-dom';

const Messages: React.FC = () => {
    const [messagesThreads, setMessagesThreads] = useState<MessagesThreadProps[]>([]);

    useEffect(() => {
        const fetchMessagesThreads = async () => {
            try {
                const response = await getMessageThreads();
                setMessagesThreads((await response.json()).rooms);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessagesThreads();
    }, []);

    return (
        <div className='messages'>
            <div className='messages__threads'>
                <SearchMessagesThread />
                <div className='messages__threads--list'>
                    {
                        messagesThreads.map((item, index) => (
                            <MessagesThread
                                key={index}
                                roomId={item.roomId}
                                avatar={item.avatar}
                                title={item.title}
                                lastMessage={item.lastMessage}
                                lastMessageAt={item.lastMessageAt} />
                        ))
                    }
                </div>
            </div>
            <div className='messages__content'>
                <Outlet context={{ messagesThreads: messagesThreads }} />
            </div>
        </div>
    );
};

export default Messages;