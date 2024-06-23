import axios from 'axios';
import './PageDetail.scss';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BookDetailAll, BookStatusEnum } from '../../services/models/BookDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import Ranking from '../../components/ranking/Ranking';
import { FaEye } from 'react-icons/fa';
import Comment from '../../components/comment/Comment';

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
  { number: 180, date: "15/01/2024", viewed: 5000 },
  { number: 179, date: "15/01/2024", viewed: 6000 },
  { number: 178, date: "15/01/2024", viewed: 8000 },
  { number: 180, date: "15/01/2024", viewed: 5000 },
  { number: 179, date: "15/01/2024", viewed: 6000 },
  { number: 178, date: "15/01/2024", viewed: 8000 },
  { number: 180, date: "15/01/2024", viewed: 5000 },
  { number: 179, date: "15/01/2024", viewed: 6000 },
  { number: 178, date: "15/01/2024", viewed: 8000 },
  { number: 180, date: "15/01/2024", viewed: 5000 },
  { number: 179, date: "15/01/2024", viewed: 6000 },
  { number: 178, date: "15/01/2024", viewed: 8000 },
  { number: 180, date: "15/01/2024", viewed: 5000 },
  { number: 179, date: "15/01/2024", viewed: 6000 },
  { number: 178, date: "15/01/2024", viewed: 8000 },
  { number: 180, date: "15/01/2024", viewed: 5000 },
  { number: 179, date: "15/01/2024", viewed: 6000 },
  { number: 178, date: "15/01/2024", viewed: 8000 },
  { number: 180, date: "15/01/2024", viewed: 5000 },
  { number: 179, date: "15/01/2024", viewed: 6000 },
  { number: 178, date: "15/01/2024", viewed: 8000 },
  { number: 180, date: "15/01/2024", viewed: 5000 },
  { number: 179, date: "15/01/2024", viewed: 6000 },
  { number: 178, date: "15/01/2024", viewed: 8000 },
  { number: 180, date: "15/01/2024", viewed: 5000 },
  { number: 179, date: "15/01/2024", viewed: 6000 },
  { number: 178, date: "15/01/2024", viewed: 8000 },
  { number: 180, date: "15/01/2024", viewed: 5000 },
  { number: 179, date: "15/01/2024", viewed: 6000 },
  { number: 178, date: "15/01/2024", viewed: 8000 },
  { number: 180, date: "15/01/2024", viewed: 5000 },
  { number: 179, date: "15/01/2024", viewed: 6000 },
];



const PageDetail: React.FC = () => {
  const { id } = useParams<{ namebook?: string, id?: string; }>();
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
      // Navigate to the same book detail page after rating change
      navigate(`/book/${book?.nameUrl}/${book?.bookId}`, { replace: false });
    }
  }, [book, navigate]);

  // Thêm trạng thái để theo dõi xem phần giới thiệu có được mở rộng hay không
  const [isExpanded, setIsExpanded] = useState(false);

  // Hàm để chuyển đổi trạng thái
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  function handleUp(): void {
    setUp(!up);
  }

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleReadFromBeginning = () => {
    // Implement logic for "Đọc từ đầu"
  };

  const handleReadLatestChapter = () => {
    // Implement logic for "Đọc chapter mới nhất"
  };

  const handleContinueReading = () => {
    // Implement logic for "Đọc tiếp"
  };

  const handleFollow = () => {
    // Implement logic for "Theo dõi"
  };

  const handleLike = () => {
    // Implement logic for "Thích"
  };

  function handleChapterSelect(chapter: number, chapterId: number): void {
    navigate(`/book/${book?.nameUrl}/${book?.bookId}/chapter-${chapter}`, {
      replace: true, // Optional: Replace current entry in history
      state: {
        bookName: book?.name,
        bookId: book?.bookId,
        chapterId: chapterId,
      },
    });
  }

  useEffect(() => {
    // Hàm để xử lý logic và sau đó gọi navigate
    const handleNavigate = () => {
      if (book) {
        setRating(book.rating);
        // Navigate to the same book detail page after rating change
        navigate(`/book/${book?.nameUrl}/${book?.bookId}`, { replace: false });
      }
    };

    // Gọi hàm xử lý trong useEffect để đảm bảo tuân thủ quy tắc của React
    handleNavigate();
  }, [book, navigate]);


  // Xem book có tồn tại không nếu không thì báo sách không tồn tại
  if (book === undefined || book === null) {
    navigate('*', { replace: true });
  } else
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
                      <td>{book.anotherNames ? book.anotherNames.join(", ") : "No other names"}</td>
                    </tr>
                    <tr>
                      <th>Author</th>
                      <td>{book.author}</td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <td>{BookStatusEnum[book.status]}</td>
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
                    <span key={index} className='mr-2 category'>{category}</span>
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
                {/* Danh sach cac bottom chuyen huong doc sach*/}
                <div className="book-actions">
                  <button className="action-button bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-2" onClick={handleReadFromBeginning}>Đọc từ đầu</button>
                  <button className="action-button bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md mr-2" onClick={handleReadLatestChapter}>Mới nhất</button>
                  <button className="action-button bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded-md mr-2" onClick={handleContinueReading}>Đọc tiếp</button>
                  <button className="action-button bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded-md mr-2" onClick={handleFollow}>Theo dõi</button>
                  <button className="action-button bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md" onClick={handleLike}>Thích</button>
                </div>
              </div>
            </div>
            <div className='desciption p-5'>
              <p className='ml-2'>Giới thiệu</p>
              <div className='line'></div>
              <p className={`${isExpanded ? '' : 'line-clamp-3'} ml-2`}>{book.description}</p>
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
              {/* Danh sach chapter */}
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
                        <tr key={index} onClick={() => handleChapterSelect(chapter.number, chapter.number)} className='cursor-pointer'>
                          <td><p className='px-3'>Chapter {chapter.number}</p></td>
                          <td className='text-center'>{chapter.date}</td>
                          <td className='text-center text-gray-500'>
                            <div className='inline-flex items-center'>{chapter.viewed}<FaEye className='ml-2' /></div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Ket thuc danh sach chapter */}
              {/* Comment */}
              <div className='mt-8'>
                <div className='inline-flex w-full content-between'>
                  <p className='ml-2 mr-[50%]'>Bình luận</p>
                  <div className='flex'>
                    <p className='mr-2'>{book.commented} Commented sort by </p>
                    <p className='mr-2'>Chapter</p>
                    <p className='mr-2'>Liked</p>
                    <p className='mr-2'>Date</p>
                  </div>
                </div>
                <div className="line"></div>
                <Comment></Comment>
              </div>
              {/* Comment */}
            </div>
          </div>

          {/* Danh sach Tag va Chi tiet Rating */}
          <div className="p-4 tags-container min-w-[30%]">
            {/* List Tags */}
            <div className="mb-4">
              <h2 className="text-lg mb-2">Tags [ {up ? <FontAwesomeIcon icon={faAngleDoubleDown} className='down-arrow' onClick={handleUp} /> :
                <FontAwesomeIcon icon={faAngleDoubleUp} className='down-arrow' onClick={handleUp} />} ]</h2>
              <div className={`${up ? 'hidden' : ''}`}>
                <div className='flex flex-wrap gap-2'>
                  {book.tags && book.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="tags"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* End list tags */}

            {/* Rating */}
            <div className="w-72 font-sans">
              <h2 className="text-lg mb-2">Rating ({book.rating} / 5.0, {book.voted} votes)</h2>
              {ratings.map(rating => (
                <div key={rating.value} className="flex items-center mb-2">
                  <div className="w-5 text-right mr-2">{rating.value}</div>
                  <div className="flex-1 h-6 bg-gray-200 mr-2 relative max-w-40">
                    <div
                      className="h-full"
                      style={{
                        width: `${(rating.votes / book.voted) * 100}%`,
                        backgroundColor: rating.color,
                      }}
                    ></div>
                  </div>
                  <div className="text-left">
                    {rating.percentage}% ({rating.votes} voted)
                  </div>
                </div>
              ))}
            </div>
            {/* End rating */}
            {/* Ranking table */}
            <div>
              <Ranking />
            </div>
            {/* End Raking table */}
          </div>
        </div>
      </Fragment>
    );
};

export default PageDetail;
