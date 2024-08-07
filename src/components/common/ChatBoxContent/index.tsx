import React, { useEffect, useState } from 'react';
import './chat-box-content.scss';
import { getChat } from '../../../services/ChatService';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

interface Chat {
    userId: {
        _id: string,
        avatar: string;
    };
    content: string;
}

const ChatBoxContent: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const currentUser = useSelector((state: RootState) => state.currentUser.user);

    useEffect(() => {
        const getChatContent = async () => {
            const response = await getChat();
            const result = await response.json();
            if (response.ok) {
                setChats(result.chats);
            } else {
                console.error(response);
            }
        };

        getChatContent();
    }, []);

    return (
        <div className='chat-box-content'>
            <div className='chat-box-content__time-start'>
                6:50 AM
            </div>

            {chats.map((item, index) => (
                item.userId._id === currentUser._id ? (
                    <div className='chat-box-content__message-send' key={index}>
                        <span className='chat-box-content__message-send--content'>
                            {item.content}
                        </span>
                    </div>
                ) : (
                    <div className='chat-box-content__message-recive' key={index}>
                        <img src={item.userId.avatar} alt='avatar' />
                        <span className='chat-box-content__message-recive--content'>
                            {item.content}
                        </span>
                    </div>
                )
            ))}
        </div >
    );
}

export default ChatBoxContent;