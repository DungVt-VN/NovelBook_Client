import { Fragment } from "react/jsx-runtime";
import { FaEye } from "react-icons/fa";
import './Ranking.scss';
import { useState } from "react";

interface RankItem {
    rank: number;
    title: string;
    chapter: number;
    views: string;
    image: string;
}

const rankData: RankItem[] = [
    { rank: 1, title: 'Vạn Cổ Chí Tôn', chapter: 314, views: '8M', image: 'image-url-1' },
    { rank: 2, title: 'Ta Trời Sinh Đã Là Nhân Vật...asdfa fsafnm asdf  sjasf  jalsjf', chapter: 188, views: '107K', image: 'image-url-2' },
    { rank: 3, title: 'Vạn Cổ Tối Cường Tông', chapter: 336, views: '9M', image: 'image-url-3' },
    { rank: 4, title: 'Đại Phụng Đả Canh Nhân', chapter: 366, views: '173K', image: 'image-url-4' },
    { rank: 5, title: 'Toàn Chức Pháp Sư', chapter: 1181, views: '50M', image: 'image-url-5' },
    { rank: 6, title: 'Chưởng Môn Khiêm Tốn Chút', chapter: 378, views: '117K', image: 'image-url-6' },
    { rank: 7, title: 'Bách Luyện Thành Thần', chapter: 1197, views: '41M', image: 'image-url-7' },
];

const Ranking = () => {
    const [top, setTop] = useState(1);

    function handleSelect(x: number) {
        setTop(x);
    }

    return (
        <Fragment>
            <div className="ranking-container">
                <div className="flex bg-gray-200 rounded-t-lg">
                    <button className={`${top === 1 ? 'border-b-[3px] border-b-purple-500 bg-white rounded-tl-lg' : ''} table-header min-w-[35%] py-3`} onClick={() => handleSelect(1)}>Top Tháng</button>
                    <button className={`${top === 2 ? 'border-b-[3px] border-b-purple-500 bg-white' : ''} table-header py-3`} onClick={() => handleSelect(2)}>Top Tuần</button>
                    <button className={`${top === 3 ? 'border-b-[3px] border-b-purple-500 bg-white rounded-tr-lg' : ''} table-header py-3`} onClick={() => handleSelect(3)}>Top Ngày</button>
                </div>
                {rankData.map((item, index) => (
                    <div key={item.rank} className="my-3">
                        <div className="flex items-center">
                            <div className="w-8 text-center text-[18px] text-blue-600 px-3 mr-2">0{index + 1}</div>
                            <img src={item.image} alt='' className="w-12 h-12 rounded-lg mr-4" />
                            <div className="block w-full">
                                <div className="text-[17px] font-medium line-clamp-1 max-w-[210px]">{item.title}</div>
                                <div className="inline-flex w-full">
                                    <div className="text-gray-500 text-[14px] mr-[85px]">Chapter {item.chapter}</div>
                                    <div className="text-gray-400 flex items-center">
                                        <FaEye className="pr-1" />
                                        <p className="text-[13px]">{item.views}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="border-[0.2px] border-gray-400 w-[90%]"></div>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default Ranking;
