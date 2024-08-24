import { Link } from "react-router-dom";
import "./add-friend.scss";
import getSocket from "../../../utils/socket";
import { useState } from "react";

export type User = {
    _id: string;
    fullName: string;
    avatar?: string;
    slug: string;
};

export type Case = {
    value: 'default' | 'sent' | 'received';
}

const AddFriend: React.FC<{ user: User, caseType: Case }> = ({ user, caseType }) => {
    const [requestSent, setRequestSent] = useState(false);
    const socket = getSocket();

    const addFriend = (userId: string) => {
        socket.emit("ADD_FRIEND", {
            userId: userId
        });

        socket.once("SERVER_EMIT_SENT_FRIEND_REQUEST", () => {
            setRequestSent(true);
        });
    }

    const removeFromSuggestions = (userId: string) => { // làm sau
        console.log(`removeFromSuggestions ${userId}`)
    }

    const acceptFriendRequest = (userId: string) => {
        socket.emit("ACCEPT_FIEND_REQUEST", {
            userId: userId
        });

        socket.once("SERVER_EMIT_ACCEPT_FIEND", () => {
            setRequestSent(true);
        });
    }

    const declineFriendRequest = (userId: string) => { // làm sau
        console.log(`declineFriendRequest ${userId}`)
    }

    const cancelFriendRequest = (userId: string) => { // làm sau
        console.log(`cancelFriendRequest ${userId}`)
    }

    return (
        <div className='add-friend'>
            <div className='add-friend--avatar'>
                <Link to={`/users/${user.slug}`}>
                    <img src={user.avatar} />
                </Link>
            </div>
            <span className='add-friend--full-name'>
                <Link to={`/users/${user.slug}`}>
                    {user.fullName}
                </Link>
            </span>

            {caseType.value === 'default' && (
                !requestSent ? (
                    <>
                        <button className='add-friend--add-friend' onClick={() => addFriend(user._id)}>Thêm bạn bè</button>
                        <button className='add-friend--remove' onClick={() => removeFromSuggestions(user._id)}>Gỡ</button>
                    </>
                ) : (
                    <div>
                        <div className="add-friend--notification">
                            Bạn đã gửi lời mời
                        </div>
                        <button className='add-friend--remove' onClick={() => cancelFriendRequest(user._id)}>Hủy lời mời</button>
                    </div>
                )
            )}

            {caseType.value === 'received' && (
                !requestSent ? (
                    <>
                        <button className='add-friend--add-friend' onClick={() => acceptFriendRequest(user._id)}>Chấp nhận</button>
                        <button className='add-friend--remove' onClick={() => declineFriendRequest(user._id)}>Từ chối</button>
                    </>
                ) : (
                    <div>
                        <div className="add-friend--notification">
                            Đã chấp nhận lời mời
                        </div>
                    </div>
                )
            )}

            {caseType.value === 'sent' &&
                <>
                    <button className='add-friend--remove' onClick={() => cancelFriendRequest(user._id)}>Hủy lời mời</button>
                </>
            }

        </div>
    );
};

export default AddFriend;