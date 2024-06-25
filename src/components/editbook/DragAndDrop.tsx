import React, { useCallback, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';
import './EditBook.scss';
import PopupMessage from '../popupmessage/PopupMessage';
import axios from 'axios';
import { uploadImageToDrive } from '../../services/utils/imageUploadService';

export interface DragAndDropRef {
    handleImageUpload: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

interface DragAndDropProps {
    onUpload: (url: string) => void;
}

const DragAndDrop = forwardRef<DragAndDropRef, DragAndDropProps>(({ onUpload }, ref) => {
    const [showPopup, setShowPopup] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const firstFile = acceptedFiles[0];
            if (firstFile.type.startsWith('image')) {
                setUploadedFile(firstFile);
                const fileUrl = URL.createObjectURL(firstFile);
                setImageUrl(fileUrl);
                setUploaded(false); // Reset upload status if new file is selected
            } else {
                setShowPopup(true);
            }
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const closePopup = () => setShowPopup(false);

    const handleUploadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Ngăn chặn hành động submit mặc định của nút
        fileInputRef.current?.click();
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const firstFile = Array.from(files).find(file => file.type.startsWith('image'));
            if (firstFile) {
                setUploadedFile(firstFile);
                const fileUrl = URL.createObjectURL(firstFile);
                setImageUrl(fileUrl);
                setUploaded(false); // Reset upload status if new file is selected
            } else {
                setShowPopup(true);
            }
        }
    };

    const handleImageUpload = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Ngăn chặn hành động submit mặc định của nút

        if (!uploadedFile) {
            alert('Please select a file first');
            return;
        }

        setUploading(true);

        try {
            const imageUrl = await uploadImageToDrive(uploadedFile);
            if (imageUrl) {
                setImageUrl(imageUrl);
                onUpload(imageUrl); // Gọi hàm prop để thông báo cho thành phần cha
                setUploaded(true); // Đánh dấu đã tải lên
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Error uploading image:', error.response?.data);
                alert(`Error uploading image: ${error.response?.data?.message || error.message}`);
            } else if (error instanceof Error) {
                console.error('Error uploading image:', error.message);
                alert(`Error uploading image: ${error.message}`);
            } else {
                alert('Unexpected error uploading image');
            }
        } finally {
            setUploading(false);
        }
    };

    useImperativeHandle(ref, () => ({
        handleImageUpload,
    }));

    return (
        <div className="drag-and-drop">
            {showPopup && <PopupMessage message="Only image files are allowed." onClose={closePopup} />}
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                <input {...getInputProps()} />
                {imageUrl ? (
                    <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
                ) : isDragActive ? (
                    <p>Drop the files here...</p>
                ) : (
                    <p>Drag & drop some files here, or click to select files</p>
                )}
            </div>
            <div className="flex justify-center">
                <button
                    className="p-[5px] mt-3 px-3 rounded-lg bg-blue-500 hover:bg-blue-700 text-white"
                    onClick={handleUploadClick}
                >
                    Select File
                </button>
                <button
                    className="p-[5px] mt-3 px-3 rounded-lg bg-blue-500 hover:bg-blue-700 text-white"
                    onClick={handleImageUpload}
                    disabled={uploading || uploaded}
                >
                    {uploading ? 'Uploading...' : uploaded ? 'Uploaded' : 'Upload File'}
                </button>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
                accept="image/*"
            />
        </div>
    );
});

export default DragAndDrop;
