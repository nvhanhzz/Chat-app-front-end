import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import "./search-messages-thread.scss";

const SearchMessagesThread: React.FC = () => {
    const [keyword, setKeyword] = useState('');

    const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
        // do any things (suggest)
    }

    return (
        <div className='search-messages-thread'>
            <label htmlFor="keyword">
                <SearchOutlined />
            </label>
            <input id='keyword' type="text" placeholder='Tìm đoạn chat ...' value={keyword} onChange={handleChangeKeyword} />
        </div>
    );
}

export default SearchMessagesThread;