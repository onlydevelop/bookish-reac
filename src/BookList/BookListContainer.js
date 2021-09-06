import BookList from './BookList';
import { useRemoteService } from '../hook';
import { TextField } from '@material-ui/core';
import { useState, useEffect } from 'react';

const BookListContainer = () => {
    const [term, setTerm] = useState('');
    const {data, loading, error, setUrl} = useRemoteService ('http://localhost:8080/books', []);
    

    useEffect(() => {
        setUrl(`http://localhost:8080/books?q=${term}`)
      }, [term]);
    
    return (<div>
        <TextField label='Search' value={term} data-test='search' onChange={(e) => setTerm(e.target.value)} margin='normal' variant='outlined'/>
        <BookList books={data} loading={loading} error={error}/>
    </div>
    );
}

export default BookListContainer;
