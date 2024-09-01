import React, { useEffect, useState } from 'react';
import { Modal, List, Tooltip, Divider, Input, Avatar, Checkbox } from 'antd';
import { UsergroupAddOutlined, UserOutlined, CameraOutlined, SearchOutlined } from '@ant-design/icons';
import { User } from '../Friend';
import { getFriendList } from '../../../services/UserService';
import './create-group-chat.scss';
import getSocket from '../../../utils/socket';

type GroupData = {
    groupName: string;
    avatar: File | null;
    members: string[];
};

const CreateGroupChat: React.FC = () => {
    const socket = getSocket();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [friends, setFriends] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredFriends, setFilteredFriends] = useState<User[]>([]);
    const [groupName, setGroupName] = useState<string>('');
    const [selectedFriends, setSelectedFriends] = useState<User[]>([]);

    const resetStates = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(null);
        setSelectedFile(null);
        setGroupName('');
        setSearchTerm('');
        setFilteredFriends(friends);
        setSelectedFriends([]);
    };

    useEffect(() => {
        const fetchFriendList = async () => {
            try {
                const response = await getFriendList();
                if (!response.ok) {
                    throw new Error('Failed to fetch friend list');
                }
                const result = await response.json();

                const sortedFriends = result.sort((a: User, b: User) => {
                    const getFirstChar = (name: string) => name.trim()[0].toUpperCase();

                    const firstCharA = getFirstChar(a.fullName);
                    const firstCharB = getFirstChar(b.fullName);

                    const isLetterA = /^[A-Z]$/.test(firstCharA);
                    const isLetterB = /^[A-Z]$/.test(firstCharB);

                    if (isLetterA && !isLetterB) {
                        return -1;
                    }
                    if (!isLetterA && isLetterB) {
                        return 1;
                    }

                    return a.fullName.localeCompare(b.fullName, undefined, { sensitivity: 'base' });
                });

                setFriends(sortedFriends);
                setFilteredFriends(sortedFriends);
            } catch (error) {
                console.log(error);
            }
        };

        fetchFriendList();
    }, []);

    useEffect(() => {
        const filtered = friends.filter(friend =>
            friend.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFriends(filtered);
    }, [searchTerm, friends]);

    useEffect(() => {
        if (!isModalVisible) {
            resetStates();
        }
    }, [isModalVisible]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        const groupData: GroupData = {
            groupName,
            avatar: selectedFile,
            members: selectedFriends.map(friend => friend._id)
        };

        socket.emit('CREAT_GROUP_CHAT', groupData);

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [file] = e.target.files as FileList;
        if (file) {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
            setImagePreview(URL.createObjectURL(file));
            setSelectedFile(file);
        }
        e.target.value = '';
    };

    const handleCheckboxChange = (friend: User) => {
        setSelectedFriends(prevSelectedFriends => {
            if (prevSelectedFriends.includes(friend)) {
                return prevSelectedFriends.filter(selected => selected !== friend);
            } else {
                return [...prevSelectedFriends, friend];
            }
        });
    };

    const renderFriendsWithHeaders = () => {
        let currentLetter = '';
        return filteredFriends.map((friend, index) => {
            const firstChar = friend.fullName[0].toUpperCase();
            const friendInitial = /^[A-Z]$/.test(firstChar) ? firstChar : '#';
            let showHeader = false;

            if (friendInitial !== currentLetter) {
                currentLetter = friendInitial;
                showHeader = true;
            }

            return (
                <React.Fragment key={index}>
                    {showHeader &&
                        <div className='current-letter'>
                            {currentLetter}
                        </div>}
                    <List.Item key={friend._id}>
                        <Checkbox
                            onChange={() => handleCheckboxChange(friend)}
                            checked={selectedFriends.includes(friend)}
                        >
                            <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined />} src={friend.avatar} />}
                                title={friend.fullName}
                            />
                        </Checkbox>
                    </List.Item>
                </React.Fragment>
            );
        });
    };

    return (
        <div className='create-group-chat'>
            <Tooltip title="Tạo nhóm chat">
                <UsergroupAddOutlined onClick={showModal} />
            </Tooltip>
            <Modal
                className='create-group-chat__modal'
                title="Tạo nhóm"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Tạo nhóm"
                cancelText="Hủy"
                centered
            >
                <Divider />
                <div className='create-group-chat__modal--header-option'>
                    <div className='create-group-chat__modal--header-option--group-infor'>
                        <div
                            className={`create-group-chat__modal--header-option--group-infor--avatar ${imagePreview ? 'no-border' : ''}`}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                id="upload-avatar"
                            />
                            <label htmlFor="upload-avatar">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        id="blah"
                                        style={{ cursor: 'pointer' }}
                                    />
                                ) : (
                                    <CameraOutlined style={{ cursor: 'pointer' }} />
                                )}
                            </label>
                        </div>
                        <Input
                            className='create-group-chat__modal--header-option--group-infor--name'
                            placeholder="Nhập tên nhóm..."
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </div>
                    <Input
                        placeholder="Tìm kiếm"
                        style={{ marginTop: 10 }}
                        prefix={<SearchOutlined style={{ color: '#b6acac' }} />}
                        className='create-group-chat__modal--header-option--search'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Divider />
                <List itemLayout="horizontal">
                    {renderFriendsWithHeaders()}
                </List>
            </Modal>
        </div>
    );
}

export default CreateGroupChat;