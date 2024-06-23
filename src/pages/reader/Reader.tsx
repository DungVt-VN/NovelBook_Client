import { Fragment } from 'react/jsx-runtime'
import { Link, useLocation , useParams } from 'react-router-dom'

export interface BookInfo {
    bookName: string;
    bookId: number;
    chapterId: number;
}

const Reader = () => {
    const { namebook, id, chapter } = useParams<{ namebook: string, id: string, chapter: string; }>();
    const location = useLocation();
    // const navigate = useNavigate();
    const bookInfo: BookInfo = location.state as {
        bookName: string;
        bookId: number;
        chapterId: number;
    };
    return (
        <Fragment>
            <div className='block min-w-[50%]'>
                <div className='inline min-w-[100%] bg-red-400'>
                    <Link to='/'>Home </Link>
                    <Link to={`/book/${namebook}/${id}`}> / {bookInfo.bookName}</Link>
                    / Chapter {chapter?.replace("chapter-", "")}
                </div>
                <div>
                    <h2 className='mt-4 text-[20px] text-red-800 font-bold mr-1 inline-flex'>
                        {bookInfo.bookName} - Chapter {chapter?.replace("chapter-", "")}
                        <p className='text-sm'>(Cập nhật lúc: ...)</p>
                    </h2>
                </div>
                <div>
                    <div className="p-4 bg-gray-800 text-white my-4 h-auto  rounded-lg">
                        <div className="mb-2 text-center text-lg">
                            Nếu không xem được vui lòng đổi "SERVER" để có trải nghiệm tốt hơn
                        </div>
                        <div className="mb-4 text-center text-sm text-red-500">
                            Hướng dẫn khắc phục lỗi nếu ảnh bị lỗi ở tất cả các chap
                        </div>
                        <div className="flex justify-center mb-4">
                            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                                Server VIP
                            </button>
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded ml-2">
                                Báo lỗi
                            </button>
                        </div>
                        <div className="flex justify-center items-center bg-blue-100 p-2 rounded">
                            <span className="mr-2 text-blue-600">
                                Sử dụng mũi tên trái (←) hoặc phải (→) để chuyển chapter
                            </span>
                        </div>
                        <div className="flex justify-center items-center mt-4">
                            <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                                <span className="material-icons">home</span>
                            </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded ml-2">
                                <span className="material-icons">list</span>
                            </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded ml-2">
                                <span className="material-icons">refresh</span>
                            </button>
                            <select className="ml-2 p-2 rounded text-black">
                                <option>Chapter 88</option>
                                {/* Add more chapters here */}
                            </select>
                            <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded ml-2">
                                <span className="material-icons">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Reader