import React, { useEffect, useState } from 'react';
import './chat-box-content.scss';
import { getChat } from '../../../services/ChatService';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { User } from '../../../redux/actions/currentUser';

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

const MessageReceive: React.FC<{ avatar: string; content: string }> = ({ avatar, content }) => (
    <div className='chat-box-content__message-recive'>
        <img src={avatar} alt='avatar' />
        <span className='chat-box-content__message-recive--content'>
            {content}
        </span>
    </div>
);

const ChatBoxContent: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const currentUserState = useSelector((state: RootState) => state.currentUser);

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
            }
        };

        getChatContent();
    }, []);

    if (!currentUserState || !currentUserState.user) {
        return <div>Loading...</div>;
    }

    const currentUser: User = currentUserState.user;

    return (
        <div className='chat-box-content'>
            <div className='chat-box-content__time-start'>
                6:50 AM
            </div>

            {chats.map((item) => (
                item.userId._id === currentUser._id ? (
                    <MessageSend content={item.content} key={item._id} />
                ) : (
                    <MessageReceive
                        avatar={item.userId.avatar}
                        content={item.content}
                        key={item._id}
                    />
                )
            ))}
        </div>
    );
}

export default ChatBoxContent;