import React, { useState, useRef, useCallback } from 'react';
import { SmileOutlined, LikeFilled, SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import "./messages-input.scss";
import getSocket from '../../../utils/socket';
import UploadImage from '../UploadImage';
import type { UploadFile } from 'antd';
import { ChatBoxHeadProps } from '../ChatBoxHead';

interface Message {
    content: string;
    fileList?: UploadFile[];
}

const MessagesInput: React.FC<ChatBoxHeadProps> = ({ roomChat }) => {
    console.log(roomChat);

    const [content, setContent] = useState('');
    const [typeSend, setTypeSend] = useState(false);
    const [emojiVisible, setEmojiVisible] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showTyping = useCallback(() => {
        const socket = getSocket();
        socket.emit("TYPING", "show");

        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current);
        }

        timeOutRef.current = setTimeout(() => {
            socket.emit("TYPING", "hide");
        }, 3000);
    }, []);

    const handleEmojiClick = useCallback((emojiObject: EmojiClickData) => {
        setContent(prevContent => prevContent + emojiObject.emoji);

        if (inputRef.current) {
            const input = inputRef.current;
            const length = input.value.length;
            input.focus();
            input.setSelectionRange(length, length);
        }

        if (!typeSend) {
            setTypeSend(true);
        }

        setEmojiVisible(false);
        showTyping();
    }, [showTyping, typeSend]);

    const handleChangeContent = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
        setTypeSend(e.target.value !== '' || fileList.length > 0);
        showTyping();
    }, [fileList.length, showTyping]);

    const handleFileListChange = useCallback((newFileList: UploadFile[]) => {
        setFileList(newFileList);
        setTypeSend(newFileList.length > 0 || content !== '');
    }, [content]);

    const resetFileList = useCallback(() => {
        setFileList([]);
    }, []);

    const handleSend = useCallback(async () => {
        const socket = getSocket();
        const data: Message = {
            content: content,
            fileList: fileList,
        };

        socket.emit("SEND_MESSAGE", data);

        socket.once("SOCKET_EMIT_MESSAGE", () => {
            setContent("");
            resetFileList();
            setTypeSend(false);
        });
    }, [content, fileList, resetFileList]);

    return (
        <div className='messages-input'>
            <input
                ref={inputRef}
                type="text"
                placeholder='Nhập tin nhắn ...'
                value={content}
                onChange={handleChangeContent}
            />
            <div className='messages-input__button-list'>
                <Button
                    type='text'
                    icon={<SmileOutlined />}
                    onClick={() => setEmojiVisible(!emojiVisible)}
                />
                <UploadImage
                    fileList={fileList}
                    onFileListChange={handleFileListChange}
                />
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
};

export default MessagesInput;
