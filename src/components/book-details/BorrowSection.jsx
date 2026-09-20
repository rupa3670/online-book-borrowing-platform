'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { borrowBook } from '@/actions/borrowBook';
import { authClient } from '@/lib/auth-client';
import WishlistButton from './WishlistButton';

const BorrowSection = ({ bookId, max, initialLiked }) => {
  const [qty, setQty] = useState(1);
  const [isPending, startTransition] = useTransition();
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const router = useRouter();

  const handleBorrow = () => {
    if (sessionLoading) return;

    if (!session) {
      toast.warn('Please log in to borrow this book!');
      router.push('/login');
      return;
    }

    startTransition(async () => {
      const res = await borrowBook(bookId, qty);
      if (res.success) {
        toast.success(res.message);
        setQty(1);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-2 max-w-[220px]'>
          <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Quantity</p>
          <p className='text-xs text-gray-400'>{max} available</p>
        </div>
        <div className='flex items-center gap-4 border border-emerald-100 w-fit px-4 py-2 rounded-xl bg-white shadow-sm'>
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            aria-label='Decrease quantity'
            className='p-2 rounded-lg hover:bg-emerald-50 disabled:opacity-30 disabled:hover:bg-transparent transition'
          >
            <FaMinus />
          </button>
          <span
            className='font-bold text-lg w-8 text-center text-gray-800'
            aria-live='polite'
            aria-label={`Quantity: ${qty}`}
          >
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => Math.min(max, q + 1))}
            disabled={qty >= max}
            aria-label='Increase quantity'
            className='p-2 rounded-lg hover:bg-emerald-50 disabled:opacity-30 disabled:hover:bg-transparent transition'
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <div className='flex flex-wrap items-center gap-4'>
        {/* 10% accent — unified with Edit Profile / other primary CTAs */}
        <button
          onClick={handleBorrow}
          disabled={isPending || sessionLoading}
          aria-busy={isPending}
          className='btn bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white border-none px-8 shadow-sm transition disabled:opacity-60'
        >
          {isPending ? 'Borrowing...' : 'Borrow This Book'}
        </button>
        <WishlistButton bookId={bookId} initialLiked={initialLiked} />
      </div>
    </>
  );
};

export default BorrowSection;