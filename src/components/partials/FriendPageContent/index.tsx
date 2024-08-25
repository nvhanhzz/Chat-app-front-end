import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getFriendSuggest, getListReciveFriendRequests, getListSentFriendRequests } from '../../../services/UserService';
import "./friend-page-content.scss";
import AddFriend, { User } from '../../../components/common/AddFriend';
import getSocket from '../../../utils/socket';
import { Notification } from '../../common/NotificationHeader';

export type Case = 'default' | 'sent' | 'received' | 'accepted';
type Type = 'suggests' | 'requests' | 'sent-invites';

const FriendPageContent: React.FC = () => {
    const location = useLocation();
    const type: Type = location.pathname.split("/")[2] as Type;
    const [list, setList] = useState<User[]>([]);
    const [caseType, setCaseType] = useState<Case>('default');

    useEffect(() => {
        const getList = async () => {
            let response;
            switch (type) {
                case 'suggests':
                    response = await getFriendSuggest();
                    setList(await response.json());
                    setCaseType('default');
                    break;

                case 'requests':
                    response = await getListReciveFriendRequests();
                    setList(await response.json());
                    setCaseType('received');
                    break;

                case 'sent-invites':
                    response = await getListSentFriendRequests();
                    setList(await response.json());
                    setCaseType('sent');
                    break;

                default:
                    break;
            }
        }

        getList();
    }, [type]);

    useEffect(() => {
        const receiveFriendRequest = (data: { notification: Notification }) => {
            if (type === 'requests') {
                setList(prevList => [data.notification.senderId, ...prevList]);
            } else {
                setList(prevList => prevList.filter(item => item._id !== data.notification.senderId._id));
            }
        }

        const reciveAcceptFriend = (data: { notification: Notification }) => {
            setList(prevList => prevList.filter(item => item._id !== data.notification.senderId._id));
        }

        const reciveCancelFriendRequest = (data: { notification: Notification }) => {
            if (type === 'requests') {
                setList(prevList => prevList.filter(item => item._id !== data.notification.senderId._id));
            } else if (type === 'suggests') {
                setList(prevList => [...prevList, data.notification.senderId]);
            }
        }

        const socket = getSocket();
        socket.on('SERVER_EMIT_RECIVE_FRIEND_REQUEST', receiveFriendRequest);
        socket.on("SERVER_EMIT_RECIVE_ACCEPT_FRIEND", reciveAcceptFriend);
        socket.on("SERVER_EMIT_RECIVE_CANCEL_FIEND_REQUEST", reciveCancelFriendRequest);
        return () => {
            socket.off('SERVER_EMIT_RECIVE_FRIEND_REQUEST', receiveFriendRequest);
            socket.off("SERVER_EMIT_RECIVE_ACCEPT_FRIEND", reciveAcceptFriend);
            socket.off("SERVER_EMIT_RECIVE_CANCEL_FIEND_REQUEST", reciveCancelFriendRequest);
        };
    }, [type]);

    return (
        <div className='friend-page-content'>
            {list.length > 0 && list.map(item => (
                <AddFriend
                    key={item._id}
                    user={item}
                    caseType={caseType}
                />
            ))}

            {list.length === 0 && <div>Danh sách trống</div>}
        </div>
    );
};

export default FriendPageContent;