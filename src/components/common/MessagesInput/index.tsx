import React, { useState } from 'react';
import { SmileOutlined, LikeFilled, SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import "./messages-input.scss";
import getSocket from '../../../utils/socket';
import UploadImage from '../UploadImage';
import type { UploadFile } from 'antd';

interface Message {
    content: string;
    fileList?: UploadFile[];
}

const MessagesInput: React.FC = () => {
    const [content, setContent] = useState('');
    const [typeSend, setTypeSend] = useState(false);
    const [emojiVisible, setEmojiVisible] = useState(false);
    let fileList: UploadFile[] = []; // Không cần useState

    const handleEmojiClick = (emojiObject: EmojiClickData) => {
        setContent(prevContent => prevContent + emojiObject.emoji);
        if (!typeSend) {
            setTypeSend(true);
        }
        setEmojiVisible(false);
    };

    const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
        if (e.target.value) {
            setTypeSend(true);
        } else {
            setTypeSend(false);
        }
    }

    const handleFileListChange = (newFileList: UploadFile[]) => {
        fileList = newFileList;
        console.log(fileList);
        if (!typeSend && fileList.length !== 0) {
            setTypeSend(true);
        } else if (fileList.length === 0 && !content) {
            setTypeSend(false);
        }
    };

    const handleSend = async () => {
        const socket = getSocket();
        const data: Message = {
            content: content,
            fileList: fileList,
        }
        socket.emit("SEND_MESSAGE", data);

        socket.once("SOCKET_EMIT_MESSAGE", (data) => {
            data = data;
            setContent("");
        });
    }

    return (
        <div className='messages-input'>
            <input type="text" placeholder='Nhập tin nhắn ...' value={content} onChange={handleChangeContent} />
            <div className='messages-input__button-list'>
                <Button
                    type='text'
                    icon={<SmileOutlined />}
                    onClick={() => setEmojiVisible(!emojiVisible)}
                />
                <UploadImage onFileListChange={handleFileListChange} />
                <Button
                    className='messages-input__button-list--send'
                    type='text'
                    icon={typeSend ? <SendOutlined /> : <LikeFilled />}
                    onClick={handleSend}
                />
            </div>
            {emojiVisible && (
                <div className='emoji-picker'>
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}
        </div>
    );
}

export default MessagesInput;
