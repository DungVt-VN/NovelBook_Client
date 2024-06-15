import React, { Fragment, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetail.scss';
// import { BookDetail as BookDetailType } from '../../services/models/BookDetail';

// Một danh sách mô phỏng các sách (bạn có thể thay thế bằng dữ liệu thật từ API)
const books = [
    { bookId: '1', name: 'first-book', detail: 'This is the first book.' },
    { bookId: '2', name: 'second-book', detail: 'This is the second book.' },
    { bookId: '3', name: 'third-book', detail: 'This is the third book.' }
];

const BookDetail: React.FC = () => {
    const { idOrName } = useParams<{ idOrName: string }>();
    const navigate = useNavigate();

    // Tìm sách tương ứng
    const book = books.find(
        (b) => b.bookId === idOrName || b.name === idOrName
    );

    // Chuyển hướng URL nếu idOrName là bookId
    useEffect(() => {
        if (book && book.bookId === idOrName) {
            navigate(`/book/${book.name}`, { replace: true });
        }
    }, [book, idOrName, navigate]);

    // Nếu không tìm thấy sách
    if (!book) {
        return <div>Book not found!</div>;
    }

    return (
        <Fragment>
            <h1>{book.name}</h1>
            <p>{book.detail}</p>
        </Fragment>
    );
};

export default BookDetail;
