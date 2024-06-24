import './MyBook.scss';
import useFetch from '../../hooks/useFetch';
import { BookDetail, BookStatusEnum } from '../../services/models/BookDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { SortBy } from '../../services/models/SortBy';
import EditBook from '../../components/editbook/EditBook';

const MyBook: React.FC = () => {
  const url = 'http://localhost:5167/api/book';
  const { data, loading, error } = useFetch<BookDetail[]>(url);

  const [selectedStatus, setSelectedStatus] = useState<BookStatusEnum | ''>('');
  const [selectedSort, setSelectedSort] = useState<SortBy | ''>('');
  const [showAddForm, setShowAddForm] = useState(false); // State để hiển thị form

  useEffect(() => {
    if (showAddForm) {
      document.body.style.overflow = 'hidden';
      scrollToTop();
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showAddForm]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    setSelectedStatus(value as BookStatusEnum);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    setSelectedSort(value as SortBy);
  };

  const handleAddBookClick = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddForm(true); // Khi click vào nút "Add Book", hiển thị form
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="MyBook-container">
      {/* Overlay và Form chỉnh sửa */}
      {showAddForm && (
        <div className="fixed inset-0 top-32 z-50 backdrop-blur-sm bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Book Details</h2>
            {/* Form chỉnh sửa thông tin sách */}
            <EditBook isNew={true} handleClose={() => setShowAddForm(false)} />
            {/* End Form Editing */}
          </div>
        </div>
      )}

      {/* Nút "Add Book" */}
      <div className='my-3 mx-6 flex justify-between'>
        {/* Button Container */}
        <div>
          <button className='p-[8.5px] rounded-lg border-red-900 bg-slate-300 whitespace-nowrap overflow-hidden text-ellipsis'
            onClick={handleAddBookClick}>
            <FontAwesomeIcon icon={faCirclePlus} className='mr-2' />
            Add Book
          </button>
        </div>

        {/* Dropdown Container */}
        <div className='flex'>
          {/* First Dropdown */}
          <div className='mr-2'>
            <select id="bookStatus" value={selectedStatus} onChange={handleStatusChange} className="border rounded-lg p-2">
              <option value="">-- Select Status --</option>
              {Object.values(BookStatusEnum)
                .filter(value => typeof value === 'number') // filter only number values
                .map(value => (
                  <option key={value} value={value}>
                    {BookStatusEnum[value as keyof typeof BookStatusEnum]}
                  </option>
                ))}
            </select>
          </div>

          {/* Second Dropdown */}
          <div>
            <select id="bookStatus" value={selectedSort} onChange={handleSortChange} className="border rounded-lg p-2">
              <option value="">-- Select Sort --</option>
              {Object.values(SortBy)
                .filter(value => typeof value === 'number') // filter only number values
                .map(value => (
                  <option key={value} value={value}>
                    {SortBy[value as keyof typeof SortBy]}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        {data && data.map((item) => (
          <div key={item.bookId} className='w-[30%] min-w-96 h-[200px] bg-slate-600/50 m-3 p-2 flex rounded-lg'>
            <img src={item.coverImage || "https://i.pinimg.com/236x/37/3e/76/373e7691ecf16e725e49890edbca1b57.jpg"} alt="cover image" className='h-full rounded-lg mr-5' />
            <div className='w-auto h-full'>
              <table className='table-container'>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td className='limited-text'>{item.name}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>{item.status}</td>
                  </tr>
                  <tr>
                    <th>Viewed</th>
                    <td>{item.viewed}</td>
                  </tr>
                  <tr>
                    <th>Followed</th>
                    <td>{item.followed}</td>
                  </tr>
                  <tr>
                    <th>Liked</th>
                    <td>{item.liked}</td>
                  </tr>
                  <tr>
                    <th>Rating</th>
                    <td>{item.rating}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBook;
