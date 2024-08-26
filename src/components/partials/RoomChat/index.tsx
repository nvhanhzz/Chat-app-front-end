import React from 'react';
import { useParams } from 'react-router-dom';
import ChatBoxContent from '../../common/ChatBoxContent';
import ChatBoxHead from '../../common/ChatBoxHead';
import MessagesInput from '../../common/MessagesInput';
import { useOutletContext } from 'react-router-dom';
import { MessagesThreadProps } from '../../common/MessagesThread';

const RoomChat: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const context = useOutletContext<{ messagesThreads: Array<MessagesThreadProps> }>();
    const matchedRoom = context.messagesThreads.find(thread => thread.roomId === roomId);

    if (!matchedRoom) {
        return <div>Room not found</div>;
    }

    return (
        <>
            <ChatBoxHead roomChat={matchedRoom} />
            <ChatBoxContent roomChat={matchedRoom} />
            <MessagesInput roomChat={matchedRoom} />
        </>
    );
}

export default RoomChat;