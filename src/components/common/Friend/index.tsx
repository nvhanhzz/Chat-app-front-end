import { Link } from "react-router-dom";
import "./friend.scss";
import { Dropdown, Menu } from "antd";
import { EllipsisOutlined, UserDeleteOutlined, StopOutlined } from '@ant-design/icons';

export type User = {
    _id: string;
    fullName: string;
    avatar?: string;
    slug: string;
};

const Friend: React.FC<{ user: User }> = ({ user }) => {
    const handleUnfriend = () => {
        console.log("Hủy kết bạn với:", user.fullName);
    };

    const handleBlock = () => {
        console.log("Chặn người dùng:", user.fullName);
    };

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={handleUnfriend}>
                <UserDeleteOutlined />
                Hủy kết bạn
            </Menu.Item>
            <Menu.Item key="2" onClick={handleBlock}>
                <StopOutlined />
                Chặn
            </Menu.Item>
        </Menu>
    );

    return (
        <div className='friend'>
            <div className='friend--avatar'>
                <Link to={`/users/${user.slug}`}>
                    <img src={user.avatar} />
                </Link>
            </div>
            <span className='friend--full-name'>
                <Link to={`/users/${user.slug}`}>
                    {user.fullName}
                </Link>
            </span>

            <div className="friend--option">
                <Dropdown overlay={menu} trigger={['click']}>
                    <EllipsisOutlined />
                </Dropdown>
            </div>
        </div>
    );
};

export default Friend;