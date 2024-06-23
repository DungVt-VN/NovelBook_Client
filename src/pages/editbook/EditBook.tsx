import axios from 'axios';
import './EditBook.scss';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BookDetailAll, BookStatusEnum } from '../../services/models/BookDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { FaEye } from 'react-icons/fa';

const BOOK_URL = "http://localhost:5167/api/book";

const ratings = [
  { value: 5, votes: 16, percentage: 67, color: 'limegreen' },
  { value: 4, votes: 4, percentage: 17, color: 'lime' },
  { value: 3, votes: 1, percentage: 4, color: 'yellowgreen' },
  { value: 2, votes: 2, percentage: 8, color: 'gold' },
  { value: 1, votes: 1, percentage: 4, color: 'orange' },
];

export interface Chapter {
  number: number;
  date: string;
  viewed: number;
}

export const chapters: Chapter[] = [
  { number: 180, date: "15/01/2024", viewed: 5000 },
  { number: 179, date: "15/01/2024", viewed: 6000 },
  { number: 178, date: "15/01/2024", viewed: 8000 },
  // Add more chapters if necessary
];

const EditBook: React.FC = () => {
  const { id } = useParams<{ id?: string; }>();
  const [book, setBook] = useState<BookDetailAll>();
  const [rating, setRating] = useState<number | null>(null);
  const [up, setUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function dataFetch() {
      try {
        const response = await axios.get(`${BOOK_URL}/${id}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setBook(response.data);
      } catch (err) {
        navigate('*', { replace: true });
      }
    }
    dataFetch();
  }, [id, navigate]);

  useEffect(() => {
    if (book) {
      setRating(book.rating);
      navigate(`/book/${book?.nameUrl}/${book?.bookId}`, { replace: false });
    }
  }, [book, navigate]);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  function handleUp(): void {
    setUp(!up);
  }

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${BOOK_URL}/${id}`, book, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (response.status === 200) {
        alert('Book updated successfully!');
      }
    } catch (error) {
      console.error("Error updating book:", error);
      alert('Failed to update book.');
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <div className='inline min-w-[100%] bg-red-400'>
        <Link to='/'>Home </Link>
        <Link to={`/book/${book.nameUrl}/${book.bookId}`}> / {book.name}</Link>
      </div>
      <div className='book-info'>
        <div className='min-w-[70%] block'>
          <div className='flex'>
            <img src="https://i.pinimg.com/564x/37/3e/76/373e7691ecf16e725e49890edbca1b57.jpg" alt={book?.name} className='image-cover' />
            <div className='book-detail'>
              <h1 className='font-bold font-sans text-xl'>{book?.name}</h1>
              <table className="book-detail-table">
                <tbody>
                  <tr>
                    <th>Another Names</th>
                    <td>
                      <input
                        type="text"
                        value={book.anotherNames ? book.anotherNames.join(", ") : ""}
                        onChange={(e) => setBook({ ...book, anotherNames: e.target.value.split(", ") })}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Author</th>
                    <td>
                      <input
                        type="text"
                        value={book.author}
                        onChange={(e) => setBook({ ...book, author: e.target.value })}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>
                      <select
                        value={book.status}
                        onChange={(e) => setBook({ ...book, status: parseInt(e.target.value) })}
                      >
                        {Object.keys(BookStatusEnum).map((key) => (
                          <option key={key} value={BookStatusEnum[key as keyof typeof BookStatusEnum]}>
                            {key}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>Viewed</th>
                    <td>{book.viewed}</td>
                  </tr>
                  <tr>
                    <th>Followed</th>
                    <td>{book.followed}</td>
                  </tr>
                  <tr>
                    <th>Liked</th>
                    <td>{book.liked}</td>
                  </tr>
                </tbody>
              </table>
              <div className='book-category m-3 flex flex-wrap'>
                {book.categories && book.categories.map((category, index) => (
                  <input
                    key={index}
                    type="text"
                    value={category}
                    onChange={(e) => {
                      const newCategories = [...(book.categories ?? [])];
                      newCategories[index] = e.target.value;
                      setBook({ ...book, categories: newCategories });
                    }}
                    className='mr-2 category'
                  />
                ))}
              </div>
              <div className="star-rating">
                <p className='text-sm'>Lượt đánh giá: {book?.voted}, {book.rating}/5 điểm</p>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= (rating || 0) ? 'star selected' : 'star'}
                    onClick={() => handleStarClick(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button onClick={handleSave} className="action-button bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-2">
                Save
              </button>
            </div>
          </div>
          <div className='desciption p-5'>
            <p className='ml-2'>Giới thiệu</p>
            <div className='line'></div>
            <textarea
              className={`ml-2 ${isExpanded ? '' : 'line-clamp-3'}`}
              value={book.description}
              onChange={(e) => setBook({ ...book, description: e.target.value })}
            ></textarea>
            <button
              className="ml-2 text-blue-500 hover:underline"
              onClick={toggleExpand}
            >
              {isExpanded ? '< Thu gọn' : 'Xem thêm >'}
            </button>
          </div>

          <div className="chapter-list">
            <p className='ml-2'>Danh sach chapter</p>
            <div className="line"></div>
            <div className="chapter-list-container">
              <div className="scroll-wrapper">
                <table className='text-left relative border-collapse'>
                  <thead>
                    <tr>
                      <th className='w-[70%]'><p className='pl-3 py-[4px]'>Số chương</p></th>
                      <th className='w-26 text-center'>Ngày đăng</th>
                      <th className='w-26 text-center'>Lượt xem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chapters && chapters.map((chapter, index) => (
                      <tr key={index} className='cursor-pointer'>
                        <td><p className='px-3'>Chapter {chapter.number}</p></td>
                        <td className='text-center'>{chapter.date}</td>
                        <td className='text-center text-gray-500'>
                          <div className='inline-flex items-center'>{chapter.viewed}<FaEye className='ml-1' /></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='follow-box p-3'>
          <p className='font-bold font-sans text-lg'>Thể loại</p>
          <div className='flex items-center'><FontAwesomeIcon className='mr-2' icon={up ? faAngleDoubleUp : faAngleDoubleDown} onClick={handleUp} />
            <p className='mb-0 font-semibold'>{book?.categories?.length ?? 0} Thể loại</p>
          </div>
          <div className='line'></div>
          {up && <div className='flex flex-wrap mt-3'>
            {book.categories && book.categories.map((category, index) => (
              <input
                key={index}
                type="text"
                value={category}
                onChange={(e) => {
                  const newCategories = [...(book.categories ?? [])];
                  newCategories[index] = e.target.value;
                  setBook({ ...book, categories: newCategories });
                }}
                className='mr-2 category'
              />
            ))}
          </div>}
        </div>
      </div>
      <div className='rating-container'>
        {ratings.map(rating => (
          <div className="rating-bar-container" key={rating.value}>
            <div className="rating-bar" style={{ backgroundColor: rating.color, width: `${rating.percentage}%` }}></div>
            <div className="rating-label">{rating.value} sao ({rating.votes} votes)</div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default EditBook;
