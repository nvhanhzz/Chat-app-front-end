import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import "./friend-page-sider.scss";

const buttons = [
    {
        icon: UserOutlined,
        label: 'Gợi ý',
        path: '/friends/suggests'
    },
    {
        icon: UserOutlined,
        label: 'Danh sách bạn bè',
        path: '/friends/all-friends'
    },
    {
        icon: UserOutlined,
        label: 'Yêu cầu kết bạn',
        path: '/friends/requests'
    },
    {
        icon: UserOutlined,
        label: 'Lời mời đã gửi',
        path: '/friends/sent-invites'
    }
]

const items = buttons.map(
    (item, index) => ({
        key: String(index + 1),
        icon: React.createElement(item.icon),
        label: item.label,
        path: item.path,
    }),
);

const FriendPageSider: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className='friend-page-sider'>
            {
                items.map(item =>
                    <div
                        key={item.key}
                        className={`friend-page-sider__button ${location.pathname === item.path ? 'active' : ''}`}
                        onClick={() => handleClick(item.path)}
                    >
                        <div className='friend-page-sider__button--logo'>{item.icon}</div>
                        <span>{item.label}</span>
                    </div>
                )
            }
        </div>
    );
};

export default FriendPageSider;
