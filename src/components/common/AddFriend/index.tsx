import { Link } from "react-router-dom";
import "./add-friend.scss";
import getSocket from "../../../utils/socket";
import { useState } from "react";
import { Case } from "../../partials/FriendPageContent";
import { User } from "../Friend";

const AddFriend: React.FC<{ user: User, caseType: Case }> = ({ user, caseType: initialCaseType }) => {
    const [caseType, setCaseType] = useState<Case>(initialCaseType);
    const [notificationBadge, setNotificationBadge] = useState("");
    const socket = getSocket();

    const addFriend = (userId: string) => {
        socket.emit("ADD_FRIEND", {
            userId: userId
        });

        socket.once("SERVER_EMIT_SENT_FRIEND_REQUEST", () => {
            setCaseType("sent")
            setNotificationBadge("Bạn đã gửi lời mời");
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
            setCaseType("accepted");
            setNotificationBadge("Đã chấp nhận lời mời");
        });
    }

    const declineFriendRequest = (userId: string) => { // làm sau
        console.log(`declineFriendRequest ${userId}`)
    }

    const cancelFriendRequest = (userId: string) => {
        socket.emit("CANCEL_FIEND_REQUEST", {
            userId: userId
        });

        socket.once("SERVER_EMIT_CANCEL_FIEND_REQUEST", () => {
            setCaseType("default");
            setNotificationBadge("Đã hủy lời mời kết bạn");
        });
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

            {caseType === 'default' &&
                <>
                    {notificationBadge &&
                        <div className="add-friend--notification">
                            {notificationBadge}
                        </div>
                    }
                    <button className='add-friend--add-friend' onClick={() => addFriend(user._id)}>Thêm bạn bè</button>
                    <button className='add-friend--remove' onClick={() => removeFromSuggestions(user._id)}>Gỡ</button>
                </>
            }

            {caseType === 'received' && (
                <>
                    {notificationBadge &&
                        <div className="add-friend--notification">
                            {notificationBadge}
                        </div>
                    }
                    <button className='add-friend--add-friend' onClick={() => acceptFriendRequest(user._id)}>Chấp nhận</button>
                    <button className='add-friend--remove' onClick={() => declineFriendRequest(user._id)}>Từ chối</button>
                </>
            )}

            {caseType === 'sent' && (
                <>
                    {notificationBadge &&
                        <div className="add-friend--notification">
                            {notificationBadge}
                        </div>
                    }
                    <button className='add-friend--remove' onClick={() => cancelFriendRequest(user._id)}>Hủy lời mời</button>
                </>
            )}

            {caseType === 'accepted' && (
                <>
                    {notificationBadge &&
                        <div className="add-friend--notification">
                            {notificationBadge}
                        </div>
                    }
                </>
            )}
        </div>
    );
};

export default AddFriend;