import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import "./logo-header.scss";

const LogoHeader: React.FC = () => {
    const isFolded = useSelector((state: RootState) => state.fold.isFolded);

    return (
        <div className={`logo ${isFolded ? 'fold-logo' : ''}`}>
            <Link to='/'>
                <img src={isFolded ? 'https://th.bing.com/th/id/R.f81a6f373c244b1f70f4b7402b5ab372?rik=rbXh4ieLuKt%2bmA&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f09%2fReact_logo_logotype_emblem.png&ehk=QhGOkKcUKCU7FBQgHOajOiJqJBACUTD2Ni6LsfqzCEA%3d&risl=&pid=ImgRaw&r=0' : 'https://pluspng.com/img-png/react-logo-png-react-js-logo-history-design-history-and-evolution-5500x3094.png'} alt="React Logo" />
            </Link>
        </div>
    );
}

export default LogoHeader;