// src/components/ItemBook.tsx
import React from 'react';
import './ItemBook.scss'; // Import the SCSS file

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
    const chapters: Chapter[] = [
        { number: 1, time: '1 ngày trước' },
        { number: 2, time: '2 ngày trước' },
        { number: 3, time: '3 ngày trước' },
        { number: 4, time: '4 ngày trước' } // Example chapter beyond limit
    ];

    // Slice the chapters array to get the first 3 chapters
    const displayedChapters = chapters.slice(0, 3);

    return (
        <div className="list__box">
            <div className="image__box">
                <img src={item.coverImage} alt={item.name} className='image' />
                <div className='viewed'>
                    {/* Replace with actual content */}
                    day la thu nghiem
                </div>
            </div>
            <div className='manga-title'>
                <p>{item.name}</p>
            </div>
            {
                displayedChapters.map((chapter, index) => (
                    <div className="chapter-info" key={index}>
                        <div className="left">
                            <p>Chapter {chapter.number}</p>
                        </div>
                        <div className="right">
                            <p>{chapter.time}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ItemBook;
