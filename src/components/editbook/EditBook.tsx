import React, { useEffect, useState } from 'react';
import { BookStatusEnum, Category, Tag } from '../../services/models/BookDetail';
import { EditBookModel, defaultEditBookModel } from '../../services/models/EditBookModel';
import axios from 'axios';
import DragAndDrop from './DragAndDrop';
import useAuth from '../../hooks/useAuth';
import Select, { MultiValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import './EditBook.scss';

const CATEGORY_URL = 'http://localhost:5167/api/book/category';
const TAG_URL = 'http://localhost:5167/api/book/tags';
interface EditBookProps {
    isNew: boolean;
    editBook: EditBookModel;
    handleClose: () => void;
    reloadBooks: () => void; // Add this line
}

const EditBook: React.FC<EditBookProps> = ({ isNew, editBook, handleClose, reloadBooks }) => {
    if (editBook.bookId === 0) {
        editBook = defaultEditBookModel;
    }
    const [book, setBook] = useState<EditBookModel>(editBook);
    const [urlUpdated, setUrlUpdated] = useState<string | null>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>(() =>
        editBook.categories ? editBook.categories.map((category, index) => ({
            categoryId: index + 1, // Example: Assign unique IDs based on index (or use real IDs if available)
            categoryName: category,
        })) : []);

    const [selectedTags, setSelectedTags] = useState<Tag[]>(() =>
        editBook.tags ? editBook.tags.map((tag, index) => ({
            tagId: index + 1, // Example: Assign unique IDs based on index (or use real IDs if available)
            tagName: tag,
        })) : []);

    const [authorNames, setAuthorNames] = useState<{ value: string; label: string; }[]>(() =>
        editBook.anotherNames
            ? editBook.anotherNames.map((anotherName) => ({
                value: anotherName,
                label: anotherName, // Corrected property name from 'lable' to 'label'
            }))
            : []
    );

    const [tags, setTags] = useState<Tag[]>([]);
    const [, setSubmitting] = useState(false); // State to track form submission

    const { userId, token } = useAuth();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(CATEGORY_URL, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200) {
                    setCategories(response.data);
                } else {
                    console.log("Error fetching categories!");
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchTags = async () => {
            try {
                const response = await axios.get(TAG_URL, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200) {
                    setTags(response.data);
                } else {
                    console.log("Error fetching tags!");
                }
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchCategories();
        fetchTags();
    }, []);

    const handleUpload = (url: string) => {
        setUrlUpdated(url);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: parseInt(value, 10) });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = 'http://localhost:5167/api/book/edit';
        const data = {
            bookId: book.bookId,
            name: book.name,
            ownerId: userId,
            coverImage: urlUpdated,
            status: book.status,
            description: book.description,
            actived: book.actived,
            author: book.author,
            categories: selectedCategories.map(c => c.categoryName),
            tags: selectedTags.map(t => t.tagName),
            anotherNames: book.anotherNames,
        };
        try {
            setSubmitting(true); // Start submitting
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                alert('Book edited successfully!');
                // Close the form after successful submission
                handleClose();
            } else {
                alert('Failed to edit book');
            }
            reloadBooks();
        } catch (error) {
            console.error('Error editing book:', error);
            alert('An error occurred while editing the book');
        } finally {
            setSubmitting(false); // End submitting
        }
    };

    const handleChange = (selectedOptions: MultiValue<{ value: string, label: string }>) => {
        const selectedCategories = selectedOptions.map(option => {
            const category = categories.find(cat => cat.categoryName === option.value);
            return category ? category : { categoryId: 0, categoryName: option.value }; // handle case where category is not found
        });
        setSelectedCategories(selectedCategories);
    };

    const categoryOptions = categories.map(category => ({
        value: category.categoryName,
        label: category.categoryName,
    }));

    const handleChangeTag = (selectedOptions: MultiValue<{ value: string, label: string }>) => {
        const selectedTags = selectedOptions.map(option => {
            const tag = tags.find(cat => cat.tagName === option.value);
            return tag ? tag : { tagId: 0, tagName: option.value }; // handle case where category is not found
        });
        setSelectedTags(selectedTags);
    };

    const tagOptions = tags.map(category => ({
        value: category.tagName,
        label: category.tagName,
    }));


    const handleChangeAuthorNames = (newValue: MultiValue<{ value: string; label: string }>) => {
        const newAuthorNames = newValue as { value: string; label: string }[];
        setAuthorNames(newAuthorNames);
        setBook({ ...book, anotherNames: newAuthorNames.map(item => item.value) });
    };

    const handleCreateAuthorName = (inputValue: string) => {
        const newAuthorName = { value: inputValue, label: inputValue };
        const updatedAuthorNames = [...authorNames, newAuthorName];
        setAuthorNames(updatedAuthorNames);
        setBook({ ...book, anotherNames: updatedAuthorNames.map(item => item.value) });
    };

    return (
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="w-[700px] mx-auto p-4 bg-white shadow-lg rounded-lg">
            <div className='flex'>
                <DragAndDrop onUpload={handleUpload} />
                <div className='book-detail'>
                    <table className='table-container w-[450px]'>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td className='limited-text'>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={book.name}
                                        onChange={handleInputChange}
                                        className="form-input mt-1 block w-full"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td >
                                    <div>
                                        <select
                                            name="status"
                                            value={book.status}
                                            onChange={handleSelectChange}
                                            className="form-select mt-1 block w-full"
                                        >
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
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>
                                    <textarea
                                        name="description"
                                        value={book.description}
                                        onChange={handleInputChange}
                                        className="form-textarea mt-1 block w-full"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Author</th>
                                <td>
                                    <input
                                        required
                                        type="text"
                                        name="author"
                                        value={book.author}
                                        onChange={handleInputChange}
                                        className="form-input mt-1 block w-full"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Categories</th>
                                <td>
                                    <Select
                                        isMulti
                                        name="categories"
                                        value={selectedCategories.map(category => ({ value: category.categoryName, label: category.categoryName }))}
                                        onChange={(selectedOptions) => handleChange(selectedOptions as MultiValue<{ value: string, label: string }>)}
                                        options={categoryOptions}
                                        classNamePrefix="custom-select"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Tags</th>
                                <td>
                                    <Select
                                        isMulti
                                        name="tags"
                                        value={selectedTags.map(tag => ({ value: tag.tagName, label: tag.tagName }))}
                                        onChange={(selectedOptions) => handleChangeTag(selectedOptions as MultiValue<{ value: string, label: string }>)}
                                        options={tagOptions}
                                        classNamePrefix="custom-select"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Another Name</th>
                                <td>
                                    <CreatableSelect
                                        isMulti
                                        name="anotherNames"
                                        value={authorNames}
                                        onChange={handleChangeAuthorNames}
                                        onCreateOption={handleCreateAuthorName}
                                        options={authorNames}
                                        classNamePrefix="custom-select"
                                        className="form-input mt-1 block w-full"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                {isNew ? (
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600">
                        Approval
                    </button>
                ) : (
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600">
                        Save
                    </button>
                )}
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
