import React from 'react';
import {
    HomeOutlined,
    TeamOutlined,
    MessageOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useNavigate, useLocation } from 'react-router-dom';
import "./sider.scss";

const { Sider } = Layout;

const SiderComponent: React.FC = () => {
    const isFolded = useSelector((state: RootState) => state.fold.isFolded);
    const navigate = useNavigate();
    const location = useLocation();

    const getSelectedKey = () => {
        const path = location.pathname;

        if (path.startsWith('/friends')) return '2';
        if (path.startsWith('/messages')) return '3';
        if (path.startsWith('/')) return '1';

        return '1';
    };

    const handleMenuClick = (e: any) => {
        const { key } = e;
        switch (key) {
            case '1':
                navigate('/');
                break;
            case '2':
                navigate('/friends');
                break;
            case '3':
                navigate('/messages');
                break;
            default:
                break;
        }
    };

    return (
        <Sider trigger={null} collapsible collapsed={isFolded} className='sider'>
            <div className="demo-logo-vertical" />
            <Menu
                selectedKeys={[getSelectedKey()]}
                onClick={handleMenuClick}
                items={[
                    {
                        key: '1',
                        icon: <HomeOutlined />,
                        label: 'Trang chủ',
                    },
                    {
                        key: '2',
                        icon: <TeamOutlined />,
                        label: 'Bạn bè',
                    },
                    {
                        key: '3',
                        icon: <MessageOutlined />,
                        label: 'Nhắn tin',
                    },
                ]}
            />
        </Sider>
    );
};

export default SiderComponent;