import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import "./search-header.scss";

const SearchHeader: React.FC = () => {
    return (
        <div className='search'>
            <SearchOutlined />
        </div>
    );
}

export default SearchHeader;