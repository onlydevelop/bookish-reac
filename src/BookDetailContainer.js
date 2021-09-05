import React from 'react';
import { useRemoteService } from './hook';

const BookDetailContainer = ({match}) => { 
    const {data} = useRemoteService(`http://localhost:8080/books/${match.params.id}`, {});
    return (
    <h2 className='book-title'>{data.name}</h2>
    )
};

export default BookDetailContainer;
