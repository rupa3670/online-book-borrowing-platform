import getAllBooksData from '@/actions/getBooksData';
import SearchBar from '@/components/all-books/SearchBar';
import BookGrid from '@/components/all-books/BookGrid';
import Link from 'next/link';
import React, { Suspense } from 'react';

export const dynamic = 'force-dynamic';
 const AllBookPage = async ({ searchParams }) => {
    const allBooks = await getAllBooksData();

    const params = await searchParams;
    const query = params?.query || "";
    const category = params?.category || "All";
    const searchTerm = query.toLowerCase();

    const filteredBooks = allBooks.filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm);
        const matchesCategory = category === "All" || book.category === category;
        return matchesCategory && matchesSearch;
    });

    return (
        <div className='bg-emerald-50/30 min-h-screen py-8 md:py-10'>
            <div className='max-w-[60rem] mx-auto px-4'>

                {/* Header and search */}
                <div className='mb-6 text-center'>
                    <h1 className='text-3xl md:text-4xl font-bold text-emerald-900 tracking-tight mb-2'>
                        Explore Library
                    </h1>
                    <p className='text-gray-500 text-sm md:text-base mb-5'>
                        Find your next favorite book from our curated collection
                    </p>

                    <Suspense fallback={<div className='h-12 w-full max-w-md bg-gray-200/60 animate-pulse rounded-full mx-auto' />}>
                        <SearchBar />
                    </Suspense>
                </div>

                {/* Category filter */}
                <div className='flex flex-wrap justify-center gap-2 mb-8'>
                    {["All", "Story", "Tech", "Science"].map((cat) => (
                        <Link
                            key={cat}
                            href={`?category=${cat}${query ? `&query=${encodeURIComponent(query)}` : ''}`}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500 ${
                                category === cat
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'bg-white border border-emerald-200 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                            }`}
                        >
                            {cat}
                        </Link>
                    ))}
                </div>

                <BookGrid books={filteredBooks} />

            </div>
        </div>
    );
};

export default AllBookPage;