import Link from 'next/link';
import React from 'react';
import DetailsButton from '../all-books/DetailsButton';


const FeaturedBooks = ({books}) => {
    const featured = books?.slice(0,4);
    return (
        <div className='max-w-7xl mx-auto px-4 py-8'>
            <div className='font-bold text-3xl flex justify-center items-center text-emerald-800 mb-7 '>
                 <h2>Book Features</h2>
            </div>
            <div className='flex justify-between items-end mb-10 '>
              
<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
{featured?.map((book)=>(
    <div key={book.id} className='card bg-base-100 shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300'>
       <figure className='relative overflow-x-hidden'> <img src={book.image_url} alt={'book image'} className='h-78 w-full object-cover' ></img></figure>

       <div className='card-body p-4'>
        <h2 className='card-title text-emerald-800 text-lg leading-tight'>
            {book.title}
        </h2>
        <p className='text-sm text-gray-500 line-clamp-2 my-2'>
            {book.description}
        </p>
        <div className='card-actions mt-auto'>
            {/* <Link href={`/book-details/${book.id}` } className='w-full'>
            <button className='btn btn-success btn-block text-white'>View Details</button>
            </Link> */}
            <DetailsButton bookId={book.id}/>
        </div>
       </div>
    </div>
))}
</div>
            </div>
            
        </div>
    );
};

export default FeaturedBooks;