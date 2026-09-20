'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DetailsButton from '@/components/all-books/DetailsButton';
import BookCover from '@/components/all-books/BookCover';

const BOOKS_PER_PAGE = 9;

const categoryStyles = {
    Story: 'bg-violet-50 text-violet-700 border-violet-200',
    Tech: 'bg-sky-50 text-sky-700 border-sky-200',
    Science: 'bg-teal-50 text-teal-700 border-teal-200',
};

const BookGrid = ({ books }) => {
    const [page, setPage] = useState(1);

    // When the filter changes, go back to page 1
    useEffect(() => {
        setPage(1);
    }, [books]);

    const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);
    const paginatedBooks = books.slice(
        (page - 1) * BOOKS_PER_PAGE,
        page * BOOKS_PER_PAGE
    );

    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                {paginatedBooks.length > 0 ? (
                    paginatedBooks.map((book) => (
                        <div
                            key={book._id}
                            className='card card-side bg-white border border-emerald-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden h-48'
                        >
                            {/* Cover */}
                            <figure className='w-32 shrink-0 bg-gray-100'>
                                <BookCover src={book.image_url} alt={`${book.title} cover`} />
                            </figure>

                            {/* Info */}
                            <div className='card-body flex-1 min-w-0 p-4 gap-1.5'>
                                <div className='flex flex-wrap items-center gap-1'>
                                    <span
                                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${
                                            categoryStyles[book.category] ||
                                            'bg-gray-50 text-gray-700 border-gray-200'
                                        }`}
                                    >
                                        {book.category}
                                    </span>

                                    <span
                                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                                            book.available_quantity === 0
                                                ? 'bg-red-50 text-red-600'
                                                : book.available_quantity <= 3
                                                ? 'bg-amber-50 text-amber-700'
                                                : 'bg-emerald-50 text-emerald-700'
                                        }`}
                                    >
                                        {book.available_quantity === 0
                                            ? 'Out of stock'
                                            : book.available_quantity <= 3
                                            ? `Only ${book.available_quantity} left`
                                            : `${book.available_quantity} left`}
                                    </span>
                                </div>

                                <h2 className='card-title text-gray-900 text-base leading-snug line-clamp-2'>
                                    {book.title}
                                </h2>
                                <p className='text-xs text-gray-500 line-clamp-1'>by {book.author}</p>

                                <div className='card-actions mt-auto'>
                                    <DetailsButton bookId={book._id} />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='col-span-full text-center py-20'>
                        <div className='bg-emerald-50 inline-block p-10 rounded-md mb-4'>
                            <h3 className='text-2xl text-emerald-900 font-semibold'>No books found!</h3>
                            <p className='text-gray-500 mt-2'>Try searching with a different title.</p>
                            <Link href='?category=All' className='inline-block mt-4 text-emerald-700 font-medium underline'>
                                Clear filters
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className='flex justify-center items-center gap-2 mt-8'>
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className='px-4 py-2 rounded-lg text-sm font-medium border border-emerald-200 text-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-50 transition-colors'
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            onClick={() => setPage(num)}
                            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                                page === num
                                    ? 'bg-emerald-600 text-white'
                                    : 'border border-emerald-200 text-gray-600 hover:bg-emerald-50'
                            }`}
                        >
                            {num}
                        </button>
                    ))}

                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className='px-4 py-2 rounded-lg text-sm font-medium border border-emerald-200 text-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-50 transition-colors'
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
};

export default BookGrid;