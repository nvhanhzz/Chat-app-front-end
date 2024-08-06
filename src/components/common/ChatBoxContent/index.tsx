import React from 'react';
import "./chat-box-content.scss";

const ChatBoxContent: React.FC = () => {
    return (
        <div className='chat-box-content'>
            <div className='chat-box-content__time-start'>
                6:50 AM
            </div>

            <div className='chat-box-content__message-recive'>
                <img src='https://enlink.themenate.net/assets/images/avatars/thumb-1.jpg' alt={'avatar'} />
                <span className='chat-box-content__message-recive--content'>
                    Hey
                </span>
            </div>

            <div className='chat-box-content__message-recive'>
                <span className='chat-box-content__message-recive--content'>
                    What are you doing?
                </span>
            </div>

            <div className='chat-box-content__message-send'>
                <span className='chat-box-content__message-send--content'>
                    Texting the most beautiful girl in the world.
                </span>
            </div>

            <div className='chat-box-content__message-recive'>
                <img src='https://enlink.themenate.net/assets/images/avatars/thumb-1.jpg' alt={'avatar'} />
                <span className='chat-box-content__message-recive--content'>
                    Oh? How Cute
                </span>
            </div>

            <div className='chat-box-content__message-send'>
                <span className='chat-box-content__message-send--content'>
                    Yup but she's not replying so texting you
                </span>
            </div>

            <div className='chat-box-content__message-recive'>
                <img src='https://enlink.themenate.net/assets/images/avatars/thumb-1.jpg' alt={'avatar'} />
                <span className='chat-box-content__message-recive--content'>
                    Okay
                </span>
            </div>

            <div className='chat-box-content__message-recive'>
                <img src='https://enlink.themenate.net/assets/images/avatars/thumb-1.jpg' alt={'avatar'} />
                <span className='chat-box-content__message-recive--content'>
                    Hey
                </span>
            </div>

            <div className='chat-box-content__message-recive'>
                <span className='chat-box-content__message-recive--content'>
                    What are you doing?
                </span>
            </div>

            <div className='chat-box-content__message-send'>
                <span className='chat-box-content__message-send--content'>
                    Texting the most beautiful girl in the world.
                </span>
            </div>

            <div className='chat-box-content__message-recive'>
                <img src='https://enlink.themenate.net/assets/images/avatars/thumb-1.jpg' alt={'avatar'} />
                <span className='chat-box-content__message-recive--content'>
                    Oh? How Cute
                </span>
            </div>

            <div className='chat-box-content__message-send'>
                <span className='chat-box-content__message-send--content'>
                    Yup but she's not replying so texting you
                </span>
            </div>

            <div className='chat-box-content__message-recive'>
                <img src='https://enlink.themenate.net/assets/images/avatars/thumb-1.jpg' alt={'avatar'} />
                <span className='chat-box-content__message-recive--content'>
                    Okay
                </span>
            </div>
        </div>
    );
}

export default ChatBoxContent;