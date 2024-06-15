import React, { useState } from 'react';
import './ItemBook.scss';
import { BookDetail } from '../../services/models/BookDetail';
import ItemBookDetail from '../itemBookDetail/ItemBookDetail';
import { Link } from 'react-router-dom';

interface Chapter {
    number: number;
    time: string;
}

interface ItemBookProps {
    item: BookDetail;
}

const ItemBook: React.FC<ItemBookProps> = ({ item }) => {
    const [isHidden, setIsHidden] = useState(false);



    const chapters: Chapter[] = [
        { number: 1, time: '1 ngày trước' },
        { number: 2, time: '2 ngày trước' },
        { number: 3, time: '3 ngày trước' },
        { number: 4, time: '4 ngày trước' } // Example chapter beyond limit
    ];

    const displayedChapters = chapters.slice(0, 3);

    const handleMouseEnter = () => {
        setIsHidden(true);
    };

    const handleMouseLeave = () => {
        setIsHidden(false);
    };

    return (
        <div className="list__box">
            {isHidden && (
                <div className='test'>
                    <div className='w-44 h-100 detail-left' />
                    <div className="detail-right z-10">
                        <ItemBookDetail item={item} />
                    </div>
                </div>
            )}
            <Link to={`/book/${item.bookId}`}>
                <div
                    className="image__box"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img src={item.coverImage} alt={item.name} className="image" />
                    <div className="viewed">day la thu nghiem</div>
                </div>

                <div className="manga-title">
                    <p>{item.name}</p>
                </div>
            </Link>
            {displayedChapters.map((chapter, index) => (
                <div className="chapter-info" key={index}>
                    <div className="left">
                        <p>Chapter {chapter.number}</p>
                    </div>
                    <div className="right">
                        <p>{chapter.time}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemBook;
