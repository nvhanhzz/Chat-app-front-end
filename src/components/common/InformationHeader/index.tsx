import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import {
    EditOutlined,
    LockOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { postLogout } from '../../../services/AuthService';
import "./information-header.scss";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNotification } from '../../../redux/actions/notificationAction';
import { logout } from '../../../redux/actions/auth';
import { RootState } from '../../../redux/store';
import { User } from '../../../redux/actions/currentUser';

const InformationHeader: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser: User = useSelector((state: RootState) => state.currentUser.user);

    const clickLogout = async () => {
        const response = await postLogout({});
        const responseContent = await response.json();

        if (response.status === 200) {
            dispatch(addNotification('Thông báo', responseContent.message, 5));
            dispatch(logout());
            navigate("/");
        } else {
            dispatch(addNotification('Thông báo', responseContent.message, 5));
        }
    }

    const items: MenuProps['items'] = [
        {
            label:
                <div className='dropdown-information'>
                    <div className='dropdown-information__general'>
                        <div className='dropdown-information__general--avatar'>
                            <img src={currentUser.avatar} alt={currentUser.fullName} />
                        </div>
                        <div className='dropdown-information__general--infor'>
                            <span>{currentUser.fullName}</span>
                        </div>
                    </div>
                    <div className='dropdown-information__action'>
                        <ul>
                            <li>
                                <div className='dropdown-information__action--item'>
                                    <UserOutlined />
                                    <span className='dropdown-information__action--item-name'>Chỉnh sửa thông tin</span>
                                </div>
                            </li>
                            <li>
                                <div className='dropdown-information__action--item'>
                                    <LockOutlined />
                                    <span className='dropdown-information__action--item-name'>Cài đặt tài khoản</span>
                                </div>
                            </li>
                            <li>
                                <div className='dropdown-information__action--item'>
                                    <EditOutlined />
                                    <span className='dropdown-information__action--item-name'>Đổi mật khẩu</span>
                                </div>
                            </li>
                            <li onClick={clickLogout}>
                                <div className='dropdown-information__action--item'>
                                    <LogoutOutlined />
                                    <span className='dropdown-information__action--item-name'>Đăng xuất</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>,
            key: '1',
        },
    ];

    const onClick: MenuProps['onClick'] = ({ key }) => {
        key = key;
    };

    return (
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
                <div className='information'>
                    <img src={currentUser.avatar} alt={currentUser.fullName} />
                </div>
            </a>
        </Dropdown>
    );
}

export default InformationHeader;