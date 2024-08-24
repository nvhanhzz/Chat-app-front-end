import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getFriendSuggest, getListReciveFriendRequests, getListSentFriendRequests } from '../../services/UserService';
import "./friend-page-content.scss";
import AddFriend, { User, Case } from '../../components/common/AddFriend';

const FriendPageContent: React.FC = () => {
    const location = useLocation();
    const type = location.pathname.split("/")[2];
    const [list, setList] = useState<User[]>([]);
    const [caseType, setCaseType] = useState<Case>({ value: 'default' });

    useEffect(() => {
        const getList = async () => {
            let response;
            switch (type) {
                case 'suggests':
                    response = await getFriendSuggest();
                    setList(await response.json());
                    setCaseType({ value: 'default' });
                    break;

                case 'requests':
                    response = await getListReciveFriendRequests();
                    setList(await response.json());
                    setCaseType({ value: 'received' });
                    break;

                case 'sent-invites':
                    response = await getListSentFriendRequests();
                    setList(await response.json());
                    setCaseType({ value: 'sent' });
                    break;

                default:
                    break;
            }
        }

        getList();
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