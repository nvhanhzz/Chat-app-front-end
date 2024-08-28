import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import "./search-messages-thread.scss";

interface SearchMessagesThreadProps {
    onKeywordChange: (keyword: string) => void;
}

const SearchMessagesThread: React.FC<SearchMessagesThreadProps> = ({ onKeywordChange }) => {
    const [keyword, setKeyword] = useState('');

    const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newKeyword = e.target.value;
        setKeyword(newKeyword);
        onKeywordChange(newKeyword); // Gọi hàm callback khi giá trị thay đổi
    }

    return (
        <div className='search-messages-thread'>
            <label htmlFor="keySearch">
                <SearchOutlined />
            </label>
            <input id='keySearch' type="text" placeholder='Tìm đoạn chat ...' value={keyword} onChange={handleChangeKeyword} />
        </div>
    );
}

export default SearchMessagesThread;