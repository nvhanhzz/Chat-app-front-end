import React, { useState } from 'react';
import { PictureOutlined } from '@ant-design/icons';
import { Button, Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import "./upload-image.scss";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

interface UploadImageProps {
    onFileListChange: (fileList: UploadFile[]) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ onFileListChange }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        onFileListChange(newFileList); // Gửi fileList về component cha
    };

    const uploadButton = (
        <Button
            type='text'
            icon={<PictureOutlined />}
            className="upload-button"
        />
    );
    return (
        <>
            <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                className="custom-upload"
                listType="picture"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    className="hidden-image"
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};

export default UploadImage;
