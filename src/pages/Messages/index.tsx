import React, { useEffect, useState } from 'react';
import SearchMessagesThread from '../../components/common/SearchMessagesThread';
import MessagesThread, { MessagesThreadProps } from '../../components/common/MessagesThread';
import { getMessageThreads } from '../../services/ChatService';
import { Outlet, useLocation } from 'react-router-dom';
import getSocket from '../../utils/socket';
import { Chat } from '../../components/common/ChatBoxContent';
import "./messages.scss";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { User } from '../../redux/actions/currentUser';

const getRoomDetail = (room: MessagesThreadProps, currenUser: User) => {
    if (!room.lastMessage) {
        room.lastMessage = { content: null, createAt: null, userId: null };
    }
    if (room.type === 'one-to-one') {
        const otherUser = room.members.find(member => member._id !== currenUser._id);
        room.avatar = otherUser?.avatar || "https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg";
        room.title = otherUser?.fullName || "";
    } else if (room.type === 'group') {
        const otherUsers = room.members.filter(member => member._id !== currenUser._id);
        if (!room.title) {
            room.title = otherUsers.map(member => member.fullName).join(', ');
        }
        if (!room.avatar) {
            room.avatar = 'https://image.freepik.com/vector-gratis/diseno-personas-grupo-avatar-caracter-vector-ilustracion_24877-18925.jpg';
        }
    }
}

const Messages: React.FC = () => {
    const { pathname } = useLocation();
    const socket = getSocket();
    const [messagesThreads, setMessagesThreads] = useState<MessagesThreadProps[]>([]);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [displayedThreads, setDisplayedThreads] = useState<MessagesThreadProps[]>([]);
    const currentUserState = useSelector((state: RootState) => state.currentUser);

    const currentUser: User | undefined = currentUserState?.user;

    const handleKeywordChange = (keyword: string) => {
        setSearchKeyword(keyword);
    };

    useEffect(() => {
        if (!currentUser) return;

        const fetchMessagesThreads = async () => {
            try {
                const response = await getMessageThreads();
                const rooms = (await response.json()).rooms;
                for (const room of rooms) {
                    getRoomDetail(room, currentUser);
                }
                setMessagesThreads(rooms);
                setDisplayedThreads(rooms);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessagesThreads();

        const serverEmitMessage = (data: { message: Chat }) => {
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
                    setDisplayedThreads(updatedThreads.filter(thread => {
                        const regex = new RegExp(searchKeyword, 'i');
                        return regex.test(thread.title);
                    }));
                    return updatedThreads;
                }

                return prevThreads;
            });
        };

        const serverEmitOnline = (data: { isOnline: boolean; lastOnline: Date; roomId: string }) => {
            setMessagesThreads(prevThreads => {
                const updatedThreads = prevThreads.map(thread => {
                    if (thread.roomId === data.roomId) {
                        return {
                            ...thread,
                            isOnline: data.isOnline,
                            lastOnline: new Date(data.lastOnline)
                        }
                    }
                    return thread;
                });
                setDisplayedThreads(updatedThreads.filter(thread => {
                    const regex = new RegExp(searchKeyword, 'i');
                    return regex.test(thread.title);
                }));
                return updatedThreads;
            });
        };

        const serverEmitCreateNewGroup = (data: { group: MessagesThreadProps }) => {
            getRoomDetail(data.group, currentUser);
            setMessagesThreads(prevThreads => [data.group, ...prevThreads]);
        }

        socket.on("SERVER_EMIT_MESSAGE", serverEmitMessage);
        socket.on("SERVER_EMIT_ONLINE", serverEmitOnline);
        socket.on("SERVER_EMIT_CREATE_NEW_GROUP", serverEmitCreateNewGroup);

        return () => {
            socket.off("SERVER_EMIT_MESSAGE", serverEmitMessage);
            socket.off("SERVER_EMIT_ONLINE", serverEmitOnline);
            socket.off("SERVER_EMIT_CREATE_NEW_GROUP", serverEmitCreateNewGroup);
        };
    }, [socket, searchKeyword, currentUser]);

    useEffect(() => {
        const regex = new RegExp(searchKeyword, 'i');
        setDisplayedThreads(messagesThreads.filter(thread => regex.test(thread.title)));
    }, [searchKeyword, messagesThreads]);

    if (!currentUserState || !currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className='messages'>
            <div className={`messages__threads ${pathname !== '/messages' ? 'hidden' : ''}`}>
                <SearchMessagesThread onKeywordChange={handleKeywordChange} />
                <div className='messages__threads--list'>
                    {
                        displayedThreads.map((item, index) => (
                            <MessagesThread
                                key={index}
                                roomId={item.roomId || item._id as string}
                                type={item.type}
                                avatar={item.avatar}
                                title={item.title}
                                isOnline={item.isOnline}
                                lastOnline={item.lastOnline}
                                lastMessage={item.lastMessage}
                                members={item.members}
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