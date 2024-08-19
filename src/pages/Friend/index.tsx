import React from 'react';
import FriendPageSider from '../../components/partials/FriendPageSider';
import "./friend.scss";
import { Outlet } from 'react-router-dom';

const Friend: React.FC = () => {
    return (
        <div className='friend-page'>
            <FriendPageSider />
            <div className="friend-page__content">
                <Outlet />
            </div>
        </div>
    );
};

export default Friend;