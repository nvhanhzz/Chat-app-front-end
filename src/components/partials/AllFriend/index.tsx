import React, { useEffect, useState } from 'react';
import { getFriendList } from '../../../services/UserService';
import Friend, { User } from '../../common/Friend';
import "./all-fiend.scss";

const AllFriend: React.FC = () => {
    const [friends, setFriends] = useState<User[]>([]);

    useEffect(() => {
        const fetchFriendList = async () => {
            try {
                const response = await getFriendList();
                if (!response.ok) {
                    throw new Error('Failed to fetch friend list');
                }
                const result = await response.json();
                setFriends(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchFriendList();
    }, []);

    return (
        <div>
            {friends.length > 0 ? (
                <div className='friend-container'>
                    {friends.map(item => (
                        <Friend key={item._id} user={item} />
                    ))}
                </div>
            ) : (
                <div>Danh sách trống</div>
            )}
        </div>
    );
};

export default AllFriend;
