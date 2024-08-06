import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import "./search-header.scss";

const SearchHeader: React.FC = () => {
    const [keyword, setKeyword] = useState('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // do any things (search)
    }

    const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
        // do any things (suggest)
    }

    return (
        <div className='search-header'>
            <form onSubmit={handleSearch}>
                <label htmlFor="keyword">
                    <SearchOutlined />
                </label>
                <input id='keyword' type="text" placeholder='Nhập từ khóa ...' value={keyword} onChange={handleChangeKeyword} />
            </form>
        </div>
    );
}

export default SearchHeader;