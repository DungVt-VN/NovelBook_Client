// src/components/DragAndDrop.tsx

import React, { useCallback, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';
import './EditBook.scss';
import PopupMessage from '../popupmessage/PopupMessage';
import axios from 'axios';
import { uploadImageToDrive } from '../../services/utils/imageUploadService';

export interface DragAndDropRef {
    handleImageUpload: () => void;
}

interface DragAndDropProps {
    onUpload: (url: string) => void;
}

const DragAndDrop = forwardRef<DragAndDropRef, DragAndDropProps>(({ onUpload }, ref) => {
    const [showPopup, setShowPopup] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [uploading, setUploading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const firstFile = acceptedFiles[0];
            const fileType = firstFile.type;
            if (!fileType.startsWith('image')) {
                setShowPopup(true);
            } else {
                setUploadedFile(firstFile);
                const fileUrl = URL.createObjectURL(firstFile);
                setImageUrl(fileUrl);
                console.log('Accepted file:', firstFile);
            }
        } else {
            console.log('No files dropped.');
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const acceptedFiles = Array.from(files).filter(file => file.type.startsWith('image'));
            if (acceptedFiles.length > 0) {
                const firstFile = acceptedFiles[0];
                setUploadedFile(firstFile);
                const fileUrl = URL.createObjectURL(firstFile);
                setImageUrl(fileUrl);
                console.log('Accepted files:', acceptedFiles);
                console.log(imageUrl);
            } else {
                setShowPopup(true);
            }
        }
    };

    const handleImageUpload = async () => {
        if (!uploadedFile) {
            alert('Please select a file first');
            return;
        }

        setUploading(true);

        try {
            console.log("asfasf" + uploadedFile);
            const imageUrl = await uploadImageToDrive(uploadedFile);
            if (imageUrl) {
                setImageUrl(imageUrl);
                onUpload(imageUrl); // Call the prop function to notify parent component
                alert('Image uploaded successfully!');
            } else {
                throw "please select a file first";
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Handle Axios error
                console.error('Error uploading image:', error.response?.data);
                alert(`Error uploading image: ${error.response?.data?.message || error.message}`);
            } else if (error instanceof Error) {
                // Handle generic error
                console.error('Error uploading image:', error.message);
                alert(`Error uploading image: ${error.message}`);
            } else {
                // Handle unknown error
                console.error('Unexpected error uploading image:', error);
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
            <div className='flex justify-center'>
                <button className='p-[5px] mt-3 px-3 rounded-lg bg-blue-500 hover:bg-blue-700 text-white' onClick={handleUploadClick} disabled={uploading}>
                    Select File
                </button>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
                accept="image/*"
                multiple
            />
        </div>
    );
});

export default DragAndDrop;
