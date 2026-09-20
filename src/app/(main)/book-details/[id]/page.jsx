import { getBookData } from '@/actions/getBooksData';
import BorrowSection from '@/components/book-details/BorrowSection';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import WishlistButton from '@/components/book-details/WishlistButton';
import { isBookInWishlist } from '@/actions/userLibrary';
export const dynamic = 'force-dynamic';

const BookDetailsPage = async ({ params }) => {
    const { id } = await params;
    const book = await getBookData(id);

    if (!book) notFound();

    const inStock = book.available_quantity > 0;
    const inWishlist = await isBookInWishlist(id);

    return (
        <div className='bg-gradient-to-br from-emerald-50 via-white to-amber-50 min-h-screen'>
            <div className='max-w-6xl mx-auto px-4 py-12'>
                <Link
                    href='/all-books'
                    className='inline-flex items-center gap-2 mb-8 text-emerald-700 hover:text-emerald-900 font-medium transition'
                >
                    <FaArrowLeft /> Back to Library
                </Link>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 md:p-12 rounded-3xl shadow-2xl border border-emerald-100'>
                    {/* Image: full book visible */}
                    <div className='flex justify-center items-start'>
                        <div className='w-full max-w-[380px] p-4 rounded-2xl bg-gradient-to-br from-emerald-100 to-amber-100 shadow-lg'>
                            <img
                                src={book.image_url}
                                alt={book.title}
                                className='w-full h-auto max-h-[520px] object-contain rounded-xl shadow-md hover:scale-105 transition duration-500'
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div className='flex flex-col'>
                        {/* Badges */}
                        <div className='flex flex-wrap items-center gap-3 mb-4'>
                            <span className='px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 font-semibold text-sm'>
                                {book.category}
                            </span>
                            <span
                                className={`px-4 py-1.5 rounded-full font-semibold text-sm ${inStock
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-600'
                                    }`}
                            >
                                {inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>

                        <h1 className='text-4xl md:text-5xl font-extrabold text-emerald-900 mb-3'>
                            {book.title}
                        </h1>
                        <p className='text-xl font-semibold text-emerald-600 mb-4'>
                            by {book.author}
                        </p>
                        <p className='text-lg text-gray-500 mb-6 leading-relaxed'>
                            {book.description}
                        </p>

                        {/* Available copies */}
                        <div className='mb-6'>
                            <p className='text-sm font-bold text-emerald-600 mb-1'>
                                Available Copies
                            </p>
                            <p className='text-gray-700 font-semibold'>
                                {book.available_quantity} Copies
                            </p>
                        </div>

                        {/* Quantity + Borrow + Wishlist */}
                        {inStock ? (
                            <BorrowSection
                                bookId={id}
                                max={book.available_quantity}
                                initialLiked={inWishlist}
                            />
                        ) : (
                            <div className='flex flex-wrap items-center gap-4'>
                                <button className='btn btn-disabled'>Not Available</button>
                                <WishlistButton bookId={id} initialLiked={inWishlist} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsPage;