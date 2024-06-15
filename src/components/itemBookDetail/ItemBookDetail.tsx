import React from 'react';
import './ItemBookDetail.scss';
import { BookDetail } from '../../services/models/BookDetail';

interface ItemBookDetailProps {
    item: BookDetail;
    position: { top: number, left: number };
    visible: boolean;
    height: number;
}

const ItemBookDetail: React.FC<ItemBookDetailProps> = ({ item, position, visible, height }) => {
    return (
        <div
            className={`item-book-detail ${visible ? 'visible' : 'invisible'} absolute bg-white border shadow-lg p-4`}
            style={{ top: position.top, left: position.left, height: height }}
        >
            <div className="detail-header flex items-center">
                <img src={item.coverImage} alt={item.name} className="detail-image w-24 h-32 object-cover mr-4" />
                <div className="detail-title font-bold text-xl">{item.name}</div>
            </div>
            <div className="detail-content mt-4">
                <p>{item.description}</p>
                <p><strong>Author:</strong> {item.author}</p>
                <p><strong>Rating:</strong> {item.rating}</p>
                <p><strong>Viewed:</strong> {item.viewed}</p>
                <p><strong>Followed:</strong> {item.followed}</p>
                <p><strong>Commented:</strong> {item.commented}</p>
                <p><strong>Categories:</strong> {item.categories?.join(', ')}</p>
            </div>
        </div>
    );
};

export default ItemBookDetail;
