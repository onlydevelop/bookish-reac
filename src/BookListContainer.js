import BookList from './BookList';
import { useRemoteService } from './hook';

const BookListContainer = () => {
    const {data, loading, error} = useRemoteService ([]);
    return <BookList books={data} loading={loading} error={error}/>
}

export default BookListContainer;
