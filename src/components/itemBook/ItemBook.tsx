import React, { useState, useEffect, useRef } from 'react';
import './ItemBook.scss';

interface Chapter {
    number: number;
    time: string;
}

interface DataType {
    bookId: number;
    name: string;
    coverImage: string;
    status: string;
    currentChapter: number;
    description: string;
    author: string;
    voted: number;
    rating: number;
    liked: number;
    viewed: number;
    followed: number;
    commented: number;
    categories: string[] | null;
}

interface ItemBookProps {
    item: DataType;
}

const ItemBook: React.FC<ItemBookProps> = ({ item }) => {
    const [isAdjusted, setIsAdjusted] = useState(false);
    const testRef = useRef<HTMLDivElement>(null);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        if (testRef.current) {
            const rect = testRef.current.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                setIsAdjusted(true);
            } else {
                setIsAdjusted(false);
            }
        }
    }, [isHidden]);

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
                <div
                    className={`test ${isAdjusted ? 'adjust-right' : ''}`}
                    ref={testRef}
                >
                    test
                </div>
            )}
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
