import { Link } from "react-router-dom";
import "./add-friend.scss";
import getSocket from "../../../utils/socket";

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

    const handleAddFriend = (userId: string) => {
        const socket = getSocket();
        socket.emit("ADD_FRIEND", {
            userId: userId
        });

        socket.once("SERVER_EMIT_SENT_FRIEND_REQUEST", (data) => {
            console.log(data);
        })
    }

    const handleRemove = (userId: string) => {
        const socket = getSocket();
        socket.emit("REMOVE_SUGGEST", {
            userId: userId
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

            {caseType.value === 'default' &&
                <>
                    <button className='add-friend--add-friend' onClick={() => handleAddFriend(user._id)}>Thêm bạn bè</button>
                    <button className='add-friend--remove' onClick={() => handleRemove(user._id)}>Gỡ</button>
                </>
            }
            {caseType.value === 'received' &&
                <>
                    <button className='add-friend--add-friend'>Chấp nhận</button>
                    <button className='add-friend--remove'>Từ chối</button>
                </>
            }
            {caseType.value === 'sent' &&
                <>
                    <button className='add-friend--remove'>Hủy lời mời</button>
                </>
            }
        </div>
    );
};

export default AddFriend;