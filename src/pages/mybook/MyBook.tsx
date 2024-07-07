import './MyBook.scss';
import { BookDetailAll, BookStatusEnum } from '../../services/models/BookDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { SortBy } from '../../services/models/SortBy';
import EditBook from '../../components/editbook/EditBook';
import { EditBookModel, defaultEditBookModel } from '../../services/models/EditBookModel';
import axios from 'axios';
import ChapterList from '../../components/chapterlist/ChapterList';
const MYBOOK_URL = 'http://localhost:5167/api/book';


const MyBook: React.FC = () => {
  const [books, setBooks] = useState<BookDetailAll[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<BookStatusEnum | ''>('');
  const [selectedSort, setSelectedSort] = useState<SortBy | ''>('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [dataBook, setDataBook] = useState<EditBookModel>(defaultEditBookModel);
  const [isNewBook, setIsNewBook] = useState(true);
  const [showChapters, setShowChapters] = useState(false);
  const [thisBook, setThisBook] = useState<BookDetailAll | null>(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(MYBOOK_URL);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const rootElement = document.getElementById('set');

    if (showAddForm || showChapters) {
      document.body.style.overflow = 'hidden';
      if (rootElement) {
        rootElement.style.width = '100%';
        rootElement.classList.add('fixed');
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    } else {
      document.body.style.overflow = 'auto';
      if (rootElement) {
        rootElement.style.width = '';
        rootElement.classList.remove('fixed');
      }
    }

    return () => {
      document.body.style.overflow = 'auto';
      if (rootElement) {
        rootElement.style.width = '';
        rootElement.classList.remove('fixed');
      }
    };
  }, [showAddForm, showChapters]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    setSelectedStatus(value as BookStatusEnum);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    setSelectedSort(value as SortBy);
  };

  const handleAddBookClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewBook(true);
    setShowAddForm(true);
  };

  const handleDetailBook = (bookData: BookDetailAll) => {
    setIsNewBook(false);
    setShowAddForm(true);
    const data: EditBookModel = {
      bookId: bookData.bookId,
      name: bookData.name,
      ownerId: bookData.ownerId,
      coverImage: bookData.coverImage,
      status: bookData.status,
      description: bookData.description,
      actived: bookData.actived,
      author: bookData.author,
      anotherNames: bookData.anotherNames,
      categories: bookData.categories,
      tags: bookData.tags,
    };
    setDataBook(data);
  };

  const handleChapterList = (book: BookDetailAll) => {
    setShowChapters(true);
    setThisBook(book);
  }

  function handleRating(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="MyBook-container">
      {/* Overlay và Form chỉnh sửa */}
      {showAddForm && (
        <div className="fixed inset-0 top-32 z-50 backdrop-blur-sm bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Book Details</h2>
            {/* Form chỉnh sửa thông tin sách */}
            {isNewBook ? (
              <EditBook
                isNew={isNewBook}
                editBook={defaultEditBookModel}
                handleClose={() => setShowAddForm(false)}
                reloadBooks={fetchBooks}
              />
            ) : (
              <EditBook
                isNew={isNewBook}
                editBook={dataBook}
                handleClose={() => setShowAddForm(false)}
                reloadBooks={fetchBooks}
              />
            )}
            {/* End Form Editing */}
          </div>
        </div>
      )}

      {/* Overlay và Form chỉnh sửa */}
      {showChapters && (
        <div className="fixed inset-0 top-32 z-50 backdrop-blur-sm bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* danh sach chapter thông tin sách */}
            <div className='h-[70vh] w-[90vw] min-w-[600px] min-h-[200px]'>
              <ChapterList handleClose={() => setShowChapters(false)} idBook={thisBook?.bookId} bookName={thisBook?.name} />
            </div>
            {/* End Form Editing */}
          </div>
        </div>
      )}

      {/* Nút "Add Book" */}
      <div className="my-3 mx-6 flex justify-between">
        {/* Button Container */}
        <div>
          <button
            className="p-[8.5px] rounded-lg border-red-900 bg-green-500 hover:bg-green-700 whitespace-nowrap overflow-hidden text-ellipsis"
            onClick={handleAddBookClick}
          >
            <FontAwesomeIcon icon={faCirclePlus} className="mr-2" />
            Add New Book
          </button>
        </div>

        {/* Dropdown Container */}
        <div className="flex">
          {/* First Dropdown */}
          <div className="mr-2">
            <select
              id="bookStatus"
              value={selectedStatus}
              onChange={handleStatusChange}
              className="border rounded-lg p-2"
            >
              <option value="">-- Select Status --</option>
              {Object.values(BookStatusEnum)
                .filter((value) => typeof value === 'number') // filter only number values
                .map((value) => (
                  <option key={value} value={value}>
                    {BookStatusEnum[value as unknown as keyof typeof BookStatusEnum]}
                  </option>
                ))}
            </select>
          </div>

          {/* Second Dropdown */}
          <div>
            <select
              id="bookStatus"
              value={selectedSort}
              onChange={handleSortChange}
              className="border rounded-lg p-2"
            >
              <option value="">-- Select Sort --</option>
              {Object.values(SortBy)
                .filter((value) => typeof value === 'number') // filter only number values
                .map((value) => (
                  <option key={value} value={value}>
                    {SortBy[value as unknown as keyof typeof SortBy]}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        {books.map((item) => (
          <div
            key={item.bookId}
            className="w-[30%] min-w-96 h-[200px] bg-slate-600/50 m-3 p-2 flex rounded-lg"
          >
            <img
              src={item.coverImage || 'https://i.pinimg.com/236x/37/3e/76/373e7691ecf16e725e49890edbca1b57.jpg'}
              alt="cover image"
              className="h-full rounded-lg mr-5 max-w-36"
            />
            <div className="w-auto h-full">
              <table className="table-container">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td className="limited-text">{item.name}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>{item.status}</td>
                  </tr>
                  <tr>
                    <th>Viewed</th>
                    <td>{item.viewed}</td>
                  </tr>
                  <tr>
                    <th>Followed</th>
                    <td>{item.followed}</td>
                  </tr>
                  <tr>
                    <th>Liked</th>
                    <td>{item.liked}</td>
                  </tr>
                  <tr>
                    <th>Rating</th>
                    <td>{item.rating}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <button
                  className="p-1 rounded-lg border-red-900 bg-green-500 hover:bg-green-700 whitespace-nowrap overflow-hidden text-ellipsis z-40"
                  onClick={() => handleChapterList(item)}
                >
                  Chapter
                </button>
                <button
                  className="p-1 rounded-lg border-red-900 bg-green-500 hover:bg-green-700 whitespace-nowrap overflow-hidden text-ellipsis z-40"
                  onClick={() => {
                    handleDetailBook(item);
                  }}
                >
                  Edit
                </button>
                <button
                  className="p-1 rounded-lg border-red-900 bg-green-500 hover:bg-green-700 whitespace-nowrap overflow-hidden text-ellipsis z-40"
                  onClick={handleRating}
                >
                  Rating
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBook;
