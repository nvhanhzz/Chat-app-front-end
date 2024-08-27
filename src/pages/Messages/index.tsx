import React, { useEffect, useState } from 'react';
import SearchMessagesThread from '../../components/common/SearchMessagesThread';
import MessagesThread, { MessagesThreadProps } from '../../components/common/MessagesThread';
import { getMessageThreads } from '../../services/ChatService';
import { Outlet, useLocation } from 'react-router-dom';
import getSocket from '../../utils/socket';
import { Chat } from '../../components/common/ChatBoxContent';
import "./messages.scss";

const Messages: React.FC = () => {
    const { pathname } = useLocation();
    const socket = getSocket();
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

        const serverBroadcastEmitMessage = (data: { message: Chat }) => {
            setMessagesThreads(prevThreads => {
                const existingRoomIndex = prevThreads.findIndex(thread => thread.roomId === data.message.roomChatId);
                if (existingRoomIndex > -1) {
                    const updatedThreads = [...prevThreads];
                    const updatedRoom = {
                        ...updatedThreads[existingRoomIndex],
                        lastMessage: {
                            content: data.message.content,
                            createAt: new Date().toISOString(),
                            userId: data.message.userId._id
                        }
                    };
                    updatedThreads.splice(existingRoomIndex, 1);
                    updatedThreads.unshift(updatedRoom);
                    return updatedThreads;
                }

                return prevThreads;
            });
        };

        socket.on("SERVER_EMIT_MESSAGE", serverBroadcastEmitMessage);

        return () => {
            socket.off("SERVER_EMIT_MESSAGE", serverBroadcastEmitMessage);
        };
    }, []);

    return (
        <div className='messages'>
            <div className={`messages__threads ${pathname !== '/messages' ? 'hidden' : ''}`}>
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
                            />
                        ))
                    }
                </div>
            </div>
            <div className={`messages__content ${pathname === '/messages' ? 'hidden' : ''}`}>
                <Outlet context={{ messagesThreads: messagesThreads }} />
            </div>
        </div>
    );
};

export default Messages;