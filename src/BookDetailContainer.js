import { BookmarkBorder, BookmarkBorderOutlined } from '@material-ui/icons';
import React from 'react';
import BookDetail from './BookDetail';
import { useRemoteService } from './hook';

const BookDetailContainer = ({match}) => { 
    const {data} = useRemoteService(`http://localhost:8080/books/${match.params.id}`, {});
    return (
    <BookDetail book={data}/>
    )
};

export default BookDetailContainer;
