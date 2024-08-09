import React, { useEffect, useRef, useState } from 'react';
import './chat-box-content.scss';
import { getChat } from '../../../services/ChatService';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { User } from '../../../redux/actions/currentUser';
import getSocket from '../../../utils/socket';

interface Chat {
    _id: string;
    userId: {
        _id: string;
        avatar: string;
    };
    content: string;
}

const MessageSend: React.FC<{ content: string }> = ({ content }) => (
    <div className='chat-box-content__message-send'>
        <span className='chat-box-content__message-send--content'>
            {content}
        </span>
    </div>
);

const MessageReceive: React.FC<{ avatar: string | undefined; content: string }> = ({ avatar, content }) => (
    <div className='chat-box-content__message-recive'>
        {avatar && <img src={avatar} alt='avatar' />}
        <span className='chat-box-content__message-recive--content'>
            {content}
        </span>
    </div>
);

const ChatBoxContent: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>([]);
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

        return () => {
            socket.off("SOCKET_EMIT_MESSAGE");
            socket.off("SOCKET_BROADCAST_EMIT_MESSAGE");
        };
    }, []);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chats]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!currentUserState || !currentUserState.user) {
        return <div>Không thể tải người dùng.</div>;
    }

    const currentUser: User = currentUserState.user;

    // Tạo danh sách các tin nhắn với avatar chỉ hiển thị cho tin nhắn cuối cùng từ cùng một người gửi liên tiếp
    const chatsWithAvatars = chats.map((chat, index) => {
        // Kiểm tra xem tin nhắn hiện tại có phải là tin nhắn cuối cùng của người gửi liên tiếp không
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
                        content={item.content}
                    />
                ) : (
                    <MessageReceive
                        key={item._id}
                        avatar={item.showAvatar ? item.userId.avatar : undefined}
                        content={item.content}
                    />
                )
            ))}
        </div>
    );
}

export default ChatBoxContent;
