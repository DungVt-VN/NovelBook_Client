import { Fragment, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChapterModel } from '../../services/models/ChapterModel';
import './Render.scss';
import axios from 'axios';
import Select from 'react-select';
import useAuth from '../../hooks/useAuth';

const IMAGES_URL = 'http://localhost:5167/images';
const CHAPTER_URL = "http://localhost:5167/api/chapters";

const Reader = () => {
    const { namebook, id, chapter } = useParams<{ namebook: string, id: string, chapter: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [selectedChapter, setSelectedChapter] = useState<string | undefined>(chapter);
    const [bookChapters, setBookChapters] = useState<ChapterModel[]>([]);
    const [chapterNumber, setChapterNumber] = useState<number | null>(null);
    const [chapterId, setChapterId] = useState<number | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        if (chapter) {
            const match = chapter.match(/chapter-(\d+)/i);
            if (match) {
                setChapterNumber(parseInt(match[1], 10));
            } else {
                setChapterNumber(null);
            }
        }
    }, [chapter]);

    const handleChapterChange = (newChapter: number) => {
        const newChapterString = `chapter-${newChapter}`;
        setSelectedChapter(newChapterString);
        navigate(`/book/${namebook}/${id}/${newChapterString}`);
    };

    const handleNextChapter = () => {
        const currentChapter = parseInt(selectedChapter?.replace("chapter-", "") || "1");
        if (currentChapter < bookChapters.length) {
            handleChapterChange(currentChapter + 1);
        }
    };

    const handlePreviousChapter = () => {
        const currentChapter = parseInt(selectedChapter?.replace("chapter-", "") || "1");
        if (currentChapter > 1) {
            handleChapterChange(currentChapter - 1);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${CHAPTER_URL}/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBookChapters(response.data);
            } catch (error) {
                setError("Failed to fetch!");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, token]);

    useEffect(() => {
        const chapterData = bookChapters.find(chapter => chapter.chapterNumber === chapterNumber);
        if (chapterData) {
            setChapterId(chapterData.chapterId);
        }
    }, [bookChapters, chapterNumber]);

    useEffect(() => {
        const fetchImages = async () => {
            if (chapterId === null) return;
            setLoading(true);
            try {
                const response = await axios.get(`${IMAGES_URL}/${chapterId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                setImages(response.data);
            } catch {
                setError("Error fetching");
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, [chapterId]);

    const options = bookChapters.map((chapter) => ({
        value: chapter.chapterNumber,
        label: `Chapter ${chapter.chapterNumber}`,
    }));

    return (
        <Fragment>
            <div className='block min-w-[50%]'>
                <div className='inline min-w-[100%] bg-red-400'>
                    <Link to='/'>Home </Link>
                    <Link to={`/book/${namebook}/${id}`}> / {namebook?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</Link>
                    / Chapter {selectedChapter?.replace("chapter-", "")}
                </div>
                <div>
                    <h2 className='mt-4 text-[20px] text-red-800 font-bold mr-1 inline-flex'>
                        {namebook?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} - Chapter {selectedChapter?.replace("chapter-", "")}
                        <p className='text-sm'>(Cập nhật lúc: ...)</p>
                    </h2>
                </div>
                <div>
                    <div className="p-4 bg-gray-800 text-white my-4 h-auto rounded-lg">
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
                            <button onClick={handlePreviousChapter} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                                <span className="material-icons">arrow_back</span>
                            </button>
                            <Select
                                className="mx-2 w-40"
                                options={options}
                                onChange={(selectedOption) => handleChapterChange(selectedOption?.value as number)}
                                value={options.find(option => option.value === parseInt(selectedChapter?.replace("chapter-", "") || "1"))}
                                menuPlacement="auto"
                            />
                            <button onClick={handleNextChapter} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                                <span className="material-icons">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='m-3'>
                    {loading && <div>Loading...</div>}
                    {error && <div>Error!</div>}
                    {images.length === 0 ? (
                        <div>No images found!</div>
                    ) : (
                        <div>
                            {images.map((image, index) => (
                                <img key={index} src={image} alt={`Chapter Image ${index + 1}`} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex justify-center items-center mt-4">
                    <button onClick={handlePreviousChapter} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                        <span className="material-icons">arrow_back</span>
                    </button>
                    <Select
                        className="mx-2 w-40"
                        options={options}
                        onChange={(selectedOption) => handleChapterChange(selectedOption?.value as number)}
                        value={options.find(option => option.value === parseInt(selectedChapter?.replace("chapter-", "") || "1"))}
                        menuPlacement="auto"
                    />
                    <button onClick={handleNextChapter} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                        <span className="material-icons">arrow_forward</span>
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default Reader;
