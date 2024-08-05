import React from 'react';
import { Link } from 'react-router-dom';
import InformationHeader from '../../common/InformationHeader';
import SearchHeader from '../../common/SearchHeader';
import NotificationHeader from '../../common/NotificationHeader';
import "./header.scss";

const Header: React.FC = () => {

    return (
        <div className='header'>
            <div className='header__left-child'>
                <div className='header__left-child--logo'>
                    <Link to='/'>LOGO</Link>
                </div>
                <SearchHeader /></div>
            <div className='header__right-child'>
                <NotificationHeader />
                <InformationHeader />
            </div>
        </div>
    );
}

export default Header;