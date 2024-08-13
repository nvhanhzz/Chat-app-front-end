import React, { useState } from 'react';
import { PictureOutlined } from '@ant-design/icons';
import { Button, Image, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import "./upload-image.scss";

type FileType = UploadFile;

interface UploadImageProps {
    onFileListChange: (fileList: UploadFile[]) => void;
    fileList: UploadFile[];
}

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const UploadImage: React.FC<UploadImageProps> = ({ onFileListChange, fileList }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        onFileListChange(newFileList);
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
