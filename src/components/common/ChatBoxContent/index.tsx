import React, { useEffect, useRef, useState } from 'react';
import './chat-box-content.scss';
import { getChat } from '../../../services/ChatService';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { User } from '../../../redux/actions/currentUser';
import getSocket from '../../../utils/socket';
import { Image } from 'antd';

interface Chat {
    _id: string;
    userId: {
        _id: string;
        avatar: string;
    };
    content: string;
    images: string[];
    showAvatar?: boolean
}

interface TYPING {
    _id: string;
    avatar: string;
}

const MessageSend: React.FC<{ message: Chat }> = ({ message }) => (
    <div className='chat-box-content__message-send'>
        {message.content ?
            <span className='chat-box-content__message-send--content'>
                {message.content}
            </span> : <></>
        }
        {message.images.length > 0 ?
            <div className='chat-box-content__message-send--images'>
                {message.images.map((item, index) =>
                    <Image
                        key={index}
                        src={item}
                        alt={item}
                        preview={true}
                    />
                )}
            </div> : <></>
        }
    </div>
);

const MessageReceive: React.FC<{ message: Chat }> = ({ message }) => (
    <div className='chat-box-content__message-recive'>
        {message.showAvatar &&
            <img className='chat-box-content__message-recive--avatar' src={message.userId.avatar || 'https://echotecwatermakers.com/wp-content/uploads/2020/04/review-600x600.png'} alt='avatar' />
        }
        {message.content ?
            <span className='chat-box-content__message-recive--content'>
                {message.content}
            </span> : <></>
        }
        {message.images.length > 0 ?
            <div className='chat-box-content__message-recive--images'>
                {message.images.map((item, index) =>
                    <Image
                        key={index}
                        src={item}
                        alt={item}
                        preview={true}
                    />
                )}
            </div> : <></>
        }
    </div>
);

const TypingIndicator: React.FC<{ typingUsers: TYPING }> = ({ typingUsers }) => (
    <div className='chat-box-content__typing-indicator'>
        <div className='chat-box-content__typing-indicator--avatar'>
            <img className='chat-box-content__message-recive--avatar' src={typingUsers.avatar || 'https://echotecwatermakers.com/wp-content/uploads/2020/04/review-600x600.png'} alt='avatar' />
        </div>
        <div className="chat-box-content__typing-indicator--inner-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
);

const ChatBoxContent: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [typings, setTypings] = useState<TYPING[]>([]);
    const [loading, setLoading] = useState(true);
    const currentUserState = useSelector((state: RootState) => state.currentUser);
    const chatBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getChatContent = async () => {
            try {
                const response = await getChat();
                if (response.ok) {
                    const result = await response.json();
                    setChats(result.chats);
                } else {
                    console.error('Failed to fetch chats:', response.status);
                }
            } catch (error) {
                console.error('Error fetching chats:', error);
            } finally {
                setLoading(false);
            }
        };
        getChatContent();

        const socket = getSocket();
        socket.on("SOCKET_EMIT_MESSAGE", (data) => {
            setChats(prevChats => [...prevChats, data.message]);
        });
        socket.on("SOCKET_BROADCAST_EMIT_MESSAGE", (data) => {
            setChats(prevChats => [...prevChats, data.message]);
        });
        socket.on("SOCKET_BROADCAST_EMIT_TYPING", (data) => {
            if (data.type === "show") {
                setTypings(prevTypings => {
                    // Nếu người dùng chưa có trong danh sách thì thêm vào
                    if (currentUser && data.userId._id !== currentUser._id && !prevTypings.some(user => user._id === data.userId._id)) {
                        return [...prevTypings, data.userId];
                    }
                    return prevTypings;
                });
            } else if (data.type === "hide") {
                setTypings(prevTypings => prevTypings.filter(item => item._id !== data.userId._id));
            }
        });


        return () => {
            socket.off("SOCKET_EMIT_MESSAGE");
            socket.off("SOCKET_BROADCAST_EMIT_MESSAGE");
            socket.off("SOCKET_BROADCAST_EMIT_TYPING");
        };
    }, []);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chats, typings]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!currentUserState || !currentUserState.user) {
        return <div>Không thể tải người dùng.</div>;
    }

    const currentUser: User = currentUserState.user;

    const chatsWithAvatars = chats.map((chat, index) => {
        const isLastMessageFromUser = index === chats.length - 1 || chats[index + 1].userId._id !== chat.userId._id;
        return {
            ...chat,
            showAvatar: isLastMessageFromUser,
        };
    });

    return (
        <div className='chat-box-content' ref={chatBoxRef}>
            {/* <div className='chat-box-content__time-start'>
                6:50 AM
            </div> */}

            {chatsWithAvatars.map((item) => (
                item.userId._id === currentUser._id ? (
                    <MessageSend
                        key={item._id}
                        message={item}
                    />
                ) : (
                    <MessageReceive
                        key={item._id}
                        message={item}
                    />
                )
            ))}

            {typings.map((item, index) => (
                <TypingIndicator
                    key={index}
                    typingUsers={item}
                />
            ))}
        </div>
    );
}

export default ChatBoxContent;