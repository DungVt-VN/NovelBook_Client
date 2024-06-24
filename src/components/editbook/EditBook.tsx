import React, { useRef, useState } from 'react';
import { BookDetailAll, BookStatusEnum } from '../../services/models/BookDetail';
import axios from 'axios';
import DragAndDrop, { DragAndDropRef } from './DragAndDrop';

const initialBookState: BookDetailAll = {
    bookId: 0,
    name: '',
    nameUrl: '',
    ownerId: '',
    coverImage: '',
    status: BookStatusEnum.Ongoing,
    currentChapter: 0,
    description: '',
    author: '',
    categories: [],
    tags: [],
    anotherNames: [],
    voted: 0,
    rating: 0,
    liked: 0,
    viewed: 0,
    followed: 0,
    commented: 0
};

const EditBook: React.FC<{ isNew: boolean; handleClose(): void; initialBook?: BookDetailAll }> = ({ isNew, initialBook = initialBookState, handleClose }) => {
    const [book, setBook] = useState<BookDetailAll>(initialBook);
    const dragAndDropRef = useRef<DragAndDropRef>(null);

    const handleUpload = (url: string) => {
        console.log('Uploaded image URL:', url);
        // Handle the uploaded image URL as needed
    };

    const triggerUpload = () => {
        if (dragAndDropRef.current) {
            dragAndDropRef.current.handleImageUpload();
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: parseInt(value, 10) });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prepare form data
        const formData = new FormData();
        formData.append('name', book.name);
        formData.append('ownerId', book.ownerId);
        formData.append('status', book.status.toString());
        formData.append('currentChapter', book.currentChapter.toString());
        formData.append('description', book.description);
        formData.append('author', book.author);

        // Optional fields
        if (book.categories) {
            formData.append('categories', JSON.stringify(book.categories));
        }
        if (book.tags) {
            formData.append('tags', JSON.stringify(book.tags));
        }
        if (book.anotherNames) {
            formData.append('anotherNames', JSON.stringify(book.anotherNames));
        }

        // Example URL for posting data
        const url = isNew ? 'http://localhost:5167/api/books' : `http://localhost:5167/api/books/${book.bookId}`;

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Book saved successfully:', response.data);
            // Handle success, e.g., show success message or redirect
        } catch (error) {
            console.error('Error saving book:', error);
            // Handle error, e.g., show error message
        }
    };


    return (
        <form onSubmit={handleSubmit} className="w-auto mx-auto p-4 bg-white shadow-lg rounded-lg">
            <div className='flex'>
                <DragAndDrop ref={dragAndDropRef} onUpload={handleUpload} />
                <div className='book-detail'>
                    <h1 className='font-bold font-sans text-xl'>{book?.name}</h1>
                    <table className='table-container'>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td className='limited-text'>
                                    <input type="text" name="name" value={book.name} onChange={handleInputChange} className="form-input mt-1 block w-full" />
                                </td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td>
                                    <select name="status" value={book.status} onChange={handleSelectChange} className="form-select mt-1 block w-full">
                                        {Object.keys(BookStatusEnum).filter(
                                            (key) => !isNaN(Number(BookStatusEnum[key as keyof typeof BookStatusEnum]))
                                        ).map((status) => (
                                            <option
                                                key={BookStatusEnum[status as keyof typeof BookStatusEnum]}
                                                value={BookStatusEnum[status as keyof typeof BookStatusEnum]}
                                                className="capitalize"
                                            >
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>
                                    <textarea name="description" value={book.description} onChange={handleInputChange} className="form-textarea mt-1 block w-full" />

                                </td>
                            </tr>
                            <tr>
                                <th>Author</th>
                                <td>
                                    <input type="text" name="author" value={book.author} onChange={handleInputChange} className="form-input mt-1 block w-full" />
                                </td>
                            </tr>
                            <tr>
                                <th>Categories</th>
                                <td>
                                    <input type="text" name="categories" value={book.categories?.join(', ')} onChange={handleInputChange} className="form-input mt-1 block w-full" />
                                </td>
                            </tr>
                            <tr>
                                <th>Tags</th>
                                <td>
                                    <input type="text" name="tags" value={book.tags?.join(', ')} onChange={handleInputChange} className="form-input mt-1 block w-full" />
                                </td>
                            </tr>
                            <tr>
                                <th>Another Name</th>
                                <td>
                                    <input type="text" name="anotherNames" value={book.anotherNames?.join(', ')} onChange={handleInputChange} className="form-input mt-1 block w-full" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='book-category m-3 flex flex-wrap'>
                        {book.categories && book.categories.map((category, index) => (
                            <span key={index} className='mr-2 category'>{category}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600" onClick={triggerUpload}>
                    Approval
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600" onClick={triggerUpload}>
                    Save
                </button>
                <button
                    type="button"
                    onClick={handleClose}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </form>
    );
};

export default EditBook;
