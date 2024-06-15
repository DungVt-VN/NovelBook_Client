import './Home.scss';
import useFetch from '../../hooks/useFetch';
import ItemBook from '../../components/itemBook/ItemBook';
import { BookDetail } from '../../services/models/BookDetail';

const Home: React.FC = () => {
    const url = 'http://localhost:5167/api/book';
    const { data, loading, error } = useFetch<BookDetail[]>(url);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="home-container">
            <div className="flex flex-wrap justify-center">
                {data && data.map((item) => (
                    <div key={item.bookId}>
                        <ItemBook item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
