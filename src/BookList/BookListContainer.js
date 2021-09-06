import BookList from './BookList';
import { useRemoteService } from '../hook';
import { useState, useEffect } from 'react';
import SearchBox from '../SearchBox';

const BookListContainer = () => {
    const [term, setTerm] = useState('');
    const {data, loading, error, setUrl} = useRemoteService ('http://localhost:8080/books', []);
    
    const onSearch = (event) => setTerm(event.target.value);

    useEffect(() => {
        setUrl(`http://localhost:8080/books?q=${term}`)
      }, [term]);
    
    return (<div>
        <SearchBox term={term} onSearch={onSearch}/>
        <BookList books={data} loading={loading} error={error}/>
    </div>
    );
}

export default BookListContainer;
