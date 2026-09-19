'use client';

import React from 'react';

const BookCover = ({ src, alt }) => {
    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={(e) => { e.currentTarget.src = '/placeholder-book-cover.png'; }}
            className="w-full h-full object-cover object-top"
        />
    );
};

export default BookCover;