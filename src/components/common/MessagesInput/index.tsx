import React, { useState } from 'react';
import { SmileOutlined, PictureOutlined, LikeFilled, SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import "./messages-input.scss";
import getSocket from '../../../utils/socket';

const MessagesInput: React.FC = () => {
    const [content, setContent] = useState('');
    const [typeSend, setTypeSend] = useState(false);

    const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
        if (e.target.value) {
            setTypeSend(true);
        } else {
            setTypeSend(false);
        }
    }

    const handleSend = async () => {
        const socket = getSocket();
        socket.emit("SEND_MESSAGE", content);
    }

    return (
        <div className='messages-input'>
            <input type="text" placeholder='Nhập tin nhắn ...' value={content} onChange={handleChangeContent} />
            <div className='messages-input__button-list'>
                <Button
                    type='text'
                    icon={<SmileOutlined />}
                />
                <Button
                    type='text'
                    icon={<PictureOutlined />}
                />
                <Button
                    className='messages-input__button-list--send'
                    type='text'
                    icon={typeSend ? <SendOutlined /> : <LikeFilled />}
                    onClick={handleSend}
                />
            </div>
        </div>
    );
}

export default MessagesInput;