import React from 'react';
import InformationHeader from '../../common/InformationHeader';
import SearchHeader from '../../common/SearchHeader';
import NotificationHeader from '../../common/NotificationHeader';
import FoldSiderButton from '../../common/FoldSiderButtonHeader';
import LogoHeader from '../../common/LogoHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import "./header.scss";

const Header: React.FC = () => {
    const isFolded = useSelector((state: RootState) => state.fold.isFolded);

    return (
        <div className='header'>
            <LogoHeader />
            <div className={`header__child ${isFolded ? 'header__child-folded' : ''}`}>
                <div className='header__child--left'>
                    <FoldSiderButton />
                    <SearchHeader />
                </div>
                <div className='header__child--right'>
                    <NotificationHeader />
                    <InformationHeader />
                </div>
            </div>
        </div>
    );
}

export default Header;