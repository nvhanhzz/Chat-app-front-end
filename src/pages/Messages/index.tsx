import React from 'react';
import SearchMessagesThread from '../../components/common/SearchMessagesThread';
import MessagesThread, { MessagesThreadProps } from '../../components/common/MessagesThread';
import ChatBoxHead from '../../components/common/ChatBoxHead';
import MessagesInput from '../../components/common/MessagesInput';
import "./messages.scss";
import ChatBoxContent from '../../components/common/ChatBoxContent';

const Messages: React.FC = () => {
    const messagesThreads: Array<MessagesThreadProps> = [
        {
            avatar: 'https://enlink.themenate.net/assets/images/avatars/thumb-1.jpg',
            name: 'Erin Gonzales',
            lastMessage: 'Wow, that was cool!'
        },
        {
            avatar: 'https://enlink.themenate.net/assets/images/avatars/thumb-2.jpg',
            name: 'Darryl Day',
            lastMessage: 'Okay! Thank you'
        },
        {
            avatar: 'https://enlink.themenate.net/assets/images/avatars/thumb-3.jpg',
            name: 'Marshall Nichols',
            lastMessage: `It's me..can you hear me..!!`
        },
        {
            avatar: 'https://enlink.themenate.net/assets/images/avatars/thumb-4.jpg',
            name: 'Virgil Gonzales',
            lastMessage: '...but I wan to party'
        },
        {
            avatar: 'https://enlink.themenate.net/assets/images/avatars/thumb-7.jpg',
            name: 'Pamela Wanda',
            lastMessage: 'The strongest man in the world is blowing up '
        },

    ];

    return (
        <div className='messages'>
            <div className='messages__threads'>
                <SearchMessagesThread />
                <div className='messages__threads--list'>
                    {
                        messagesThreads.map((item, index) => (
                            <MessagesThread
                                key={index}
                                avatar={item.avatar}
                                name={item.name}
                                lastMessage={item.lastMessage}
                            />
                        ))
                    }
                </div>
            </div>
            <div className='messages__content'>
                <ChatBoxHead />
                <ChatBoxContent />
                <MessagesInput />
            </div>
        </div>
    );
};

export default Messages;