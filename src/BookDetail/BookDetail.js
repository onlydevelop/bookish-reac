import React from 'react';

const MAX_DESCRIPTION = 50;
const BookDetail = ({book}) => { 
    return (<div className='detail'>
        <h2 className='book-title'>{book.name}</h2> 
        <p className='book-description'>{getDescriptionFor(book)}</p>
        {showMore(book)}
    </div>
    )
};

const getDescriptionFor = (book) => {
    if (!book.description) return book.name;
    if (book.description.length > MAX_DESCRIPTION) {
        return book.description.slice(0, MAX_DESCRIPTION-3) + '...';
    } else {
        return book.description; 
    }
};
  
const showMore = (book) => {
    if (book.description && book.description.length > MAX_DESCRIPTION) {
        return <a href='' className='show-more'>Show more</a>;
    }
    return '';
};

export default BookDetail;
