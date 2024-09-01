import React, { useState } from 'react';
import { CameraOutlined } from '@ant-design/icons';
import { Upload, message, Image } from 'antd';
import type { UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const UploadImage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = async ({ file }) => {
        if (file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (file.status === 'done') {
            const fileOrigin = file.originFileObj as RcFile;
            if (fileOrigin) {
                const url = await getBase64(fileOrigin);
                setLoading(false);
                setImageUrl(url);
            }
        }
    };

    const uploadButton = (
        <div>
            <CameraOutlined style={{ fontSize: '24px' }} />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt="avatar"
                    style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                />
            ) : (
                uploadButton
            )}
        </Upload>
    );
};

export default UploadImage;
