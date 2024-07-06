import React, { Fragment, useEffect, useRef, useState } from 'react';
import './ChapterList.scss';
import { ChapterModel, ImagesModel } from '../../services/models/ChapterModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faImage, faSquarePlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from 'react-dropzone';
import { uploadImageToDrive } from '../../services/utils/imageUploadService';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { formatDate } from '../../services/utils/helper';
import { ErrorResponse } from '../../services/models/ErrorModel';

const CHAPTER_URL = "http://localhost:5167/api/chapters";
const IMAGES_URL = "http://localhost:5167/images";

interface UploadedImage {
    id: number;
    file: File;
    url: string;
    name: string;
}

const ChapterList: React.FC<{ handleClose: () => void; idBook?: number; bookName?: string }> = ({ handleClose, idBook, bookName }) => {
    const [images, setImages] = useState<UploadedImage[]>([]);
    const [imageUrls, setImageUrls] = useState<ImagesModel[]>([]);
    const [nextId, setNextId] = useState<number>(1);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [chapter, setChapter] = useState<number | string>('');
    const [title, setTitle] = useState<string>('');
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bookChapters, setBookChapters] = useState<ChapterModel[]>([]);
    const [onLoad, setOnLoad] = useState(false);
    const [chapterId, setChapterId] = useState<number | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${CHAPTER_URL}/${idBook}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBookChapters(response.data);
            } catch (error) {
                setError("Failed to fetch!");
            } finally {
                setLoading(false);
            }
        };
        if (idBook && token) {
            fetchData();
        }
    }, [idBook, token, onLoad]);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value); // Update state with input value
    };

    const handleFileChange = (files: File[]) => {
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        if (files.length !== imageFiles.length) {
            alert('Only images can be uploaded');
        }
        const newFiles = imageFiles.filter(
            (file) => !images.some((image) => image.file.name === file.name && image.file.size === file.size)
        );
        const newImages = newFiles.map((file, index) => ({
            id: nextId + index,
            file,
            url: URL.createObjectURL(file),
            name: file.name,
        }));

        setImages((prevImages) => [...prevImages, ...newImages]);
        setNextId((prevId) => prevId + newImages.length);
    };

    const handleDeleteImage = (id: number) => {
        setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    };

    const handleChooseClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleChapterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value === '') {
            setChapter('');
        } else {
            const numberValue = parseInt(value, 10);

            if (!isNaN(numberValue)) {
                setChapter(numberValue);
            }
        }
    };

    const handleImageUpload = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (images.length === 0) {
            alert('Please select a file first');
            return;
        }

        setUploading(true);

        try {
            for (const image of images) {
                const imageUrl = await uploadImageToDrive(image.file);
                if (imageUrl) {
                    const imagex: ImagesModel = {
                        url: imageUrl,
                        numbericlOrder: image.id,
                        imageId: undefined,
                        chapterId: undefined
                    };
                    setImageUrls((prevUrls) => [...prevUrls, imagex]);
                } else {
                    throw new Error('Failed to upload image');
                }
            }
            setUploaded(true);
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

    const handleCreateClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!title || !chapter || imageUrls.length === 0) {
            alert('Please fill in all required fields (Title, Chapter, and Images)');
            return;
        }
        try {
            const data = {
                MangaId: idBook,
                Title: title,
                ChapterNumber: chapter,
                Images: imageUrls,
                Viewed: 0,
                PublishedDate: new Date().toISOString(),
            };
            const response = await axios.post(
                CHAPTER_URL,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                alert(response.data);
            } else {
                console.error(response.data);
                alert(response.data);
                return;
            }
        } catch (error: unknown) {
            const err = error as ErrorResponse;
            alert(err.response?.data);
            console.error('Unexpected error:', error);
            return;
        }
        setTitle('');
        setChapter('');
        setImages([]);
        setImageUrls([]);
        setUploaded(false);
        setOnLoad(!onLoad);
    };

    const handleEditClick = async (event: React.MouseEvent<HTMLButtonElement>, item: ChapterModel) => {
        event.preventDefault();
        try {
            const response = await axios.get(`${IMAGES_URL}/${item.chapterId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const urls: string[] = response.data;

            const uploadedImages: UploadedImage[] = urls.map((url, index) => ({
                id: index + 1,
                file: new File([], ''),
                url: url,
                name: `Image ${index + 1}`
            }));
            setImages(uploadedImages);
            console.log(response.data);
        } catch (error) {
            setError("Failed to fetch!");
            alert("Failed to fetch!");
            return;
        }
        setIsEdit(true);
        setTitle(item.title);
        setChapter(item.chapterNumber);
        setChapterId(item.chapterId);
    }

    const handleSaveClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!title || imageUrls.length === 0) {
            alert('Please fill in all required fields (Title, Chapter, and Images)');
            return;
        }
        try {
            const data = {
                ChapterId: chapterId,
                MangaId: idBook,
                Title: title,
                ChapterNumber: chapter,
                Images: imageUrls,
                Viewed: 0,
                PublishedDate: new Date().toISOString(),
            };
            const response = await axios.post(
                `${CHAPTER_URL}/update`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                alert(response.data);
            } else {
                console.error(response.data);
                alert(response.data);
                return;
            }
        } catch (error: unknown) {
            const err = error as ErrorResponse;
            alert(err.response?.data);
            console.error('Unexpected error:', error);
            return;
        }

        setTitle('');
        setChapter('');
        setImages([]);
        setImageUrls([]);
        setOnLoad(!onLoad);
        setUploaded(false);
        setIsEdit(false);
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: acceptedFiles => handleFileChange(acceptedFiles),
        accept: {
            'image/*': []
        }
    });

    if (loading) {
        return (
            <div className="p-4">
                <button onClick={handleClose} className="bg-red-500 text-white px-4 py-2 rounded">Close</button>Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <button onClick={handleClose} className="bg-red-500 text-white px-4 py-2 rounded">Close</button>
                <div>Error: {error}</div>
            </div>
        );
    }

    return (
        <Fragment>
            <div className='h-full flex flex-col'>
                <div className='flex h-[90%]'>
                    <div className='w-1/2  px-4 rounded-lg z-50'>
                        <div>
                            <div className=' flex justify-center pb-2 font-bold text-2xl'>
                                {bookName}
                            </div>
                            <div className='rounded-lg overflow-y-auto h-[450px]'>
                                <table className="min-w-full bg-white shadow-lg">
                                    <thead className="bg-gray-800 text-white sticky top-0">
                                        <tr>
                                            <th className="py-2 w-24">Chapter</th>
                                            <th className="py-2 w-64 px-4">Title</th>
                                            <th className="py-2 px-4">Date</th>
                                            <th className="py-2 px-4 w-20">Viewed</th>
                                            <th className="py-2 px-2 w-16"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(!bookChapters || bookChapters.length === 0) ? (
                                            <tr>
                                                <td colSpan={5} className="py-4 text-center text-gray-500">No chapters available</td>
                                            </tr>
                                        ) : (
                                            bookChapters.map(item => (
                                                <tr key={item.chapterId} className="border-b hover:bg-gray-100">
                                                    <td className="py-2 text-center">Chapter {item.chapterNumber}</td>
                                                    <td className="py-2 px-4 text-left">{item.title}</td>
                                                    <td className="py-2 px-1 text-center">{formatDate(item.publishedDate)}</td>
                                                    <td className="py-2 px-1 text-center">{item.viewed}</td>
                                                    <td className="py-2 px-1 text-center"><button className='rounded-md bg-blue-500 hover:bg-blue-700 px-4 h-[26px] text-white' onClick={(event) => handleEditClick(event, item)}>Edit</button></td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='flex-grow p-4 rounded-lg shadow-lg ml-2'>
                        <div className='flex flex-col h-full'>
                            {/* Form Section */}
                            <div className='inline-flex w-full bg-green-200 shadow-lg p-2 rounded-md'>
                                <label htmlFor="chapter" className='mr-3 ml-1 text-gray-600'>
                                    <input type="number" placeholder="Chapter" name='chapter' value={chapter} onChange={handleChapterChange} className='ml-2 w-20 pl-3 p-1 rounded-md' required />
                                </label>
                                <label htmlFor="title">
                                    <input type="text" name='title' className='w-80 p-1 rounded-md pl-3' value={title} onChange={handleTitleChange} placeholder='Title of chapter' />
                                </label>
                                <div className='flex flex-grow justify-end items-center'>
                                    <FontAwesomeIcon icon={faCircleInfo} className='size-5 mr-2 text-blue-500' />
                                </div>
                            </div>

                            {/* Content Area */}
                            <div {...getRootProps()} className={`flex-grow bg-yellow-300 p-3 my-3 rounded-lg overflow-y-auto justify-center relative ${isDragActive ? 'border-2 border-blue-500' : ''}`}>
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <p className="text-center">Drop the files here ...</p>
                                ) : (
                                    <div className="text-center">
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                        <div className="container mx-auto p-4 flex justify-center">
                                            <div className="flex flex-wrap w-[560px]">
                                                {images && images.map((image) => (
                                                    <div key={image.id} className="relative m-2">
                                                        <div className="w-[150px] truncate">{image.file.name}</div>
                                                        <img
                                                            src={image.url}
                                                            alt={image.file.name}
                                                            className="w-[165px] h-60 object-cover border rounded-lg shadow-slate-200"
                                                        />
                                                        <button
                                                            onClick={() => handleDeleteImage(image.id)}
                                                            className="absolute top-0 right-0 w-7 bg-red-500 text-white rounded-full p-1"
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-grow rounded-lg shadow-lg items-center justify-end'>
                    {
                        isEdit ?
                            <button
                                className='p-1 px-2 rounded-[5px] bg-rose-500 text-white hover:bg-rose-700 mr-3 whitespace-nowrap'
                                onClick={handleSaveClick}
                            >
                                <FontAwesomeIcon icon={faSquarePlus} /> Save
                            </button> :
                            <button
                                className='p-1 px-2 rounded-[5px] bg-rose-500 text-white hover:bg-rose-700 mr-3 whitespace-nowrap'
                                onClick={handleCreateClick}
                            >
                                <FontAwesomeIcon icon={faSquarePlus} /> Create
                            </button>
                    }
                    <button
                        onClick={handleChooseClick}
                        className='p-1 px-2 rounded-[5px] bg-green-500 text-white hover:bg-green-700 mr-3 whitespace-nowrap'
                    >
                        <FontAwesomeIcon icon={faImage} /> Choose Image
                    </button>
                    <button
                        onClick={handleImageUpload}
                        disabled={uploading}
                        className={`p-1 px-2 rounded-[5px] ${uploading ? 'bg-gray-500' : 'bg-blue-500'} text-white hover:bg-blue-700 mr-3 whitespace-nowrap`}
                    >
                        {uploading ? 'Uploading...' : uploaded ? 'Uploaded' : <><FontAwesomeIcon icon={faUpload} className='mr-2' /> Upload</>}
                    </button>
                    <button onClick={handleClose} className="bg-red-500 text-white px-4 py-1 rounded mr-5">Close</button>
                </div>
            </div>
        </Fragment>
    );
};

export default ChapterList;
