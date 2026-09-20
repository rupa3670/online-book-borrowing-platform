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
        <p className='text-sm font-bold text-emerald-600 mb-2'>Quantity</p>
        <div className='flex items-center gap-4 border border-emerald-100 w-fit px-4 py-2 rounded-xl bg-white shadow-sm'>
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className='p-2 rounded-lg hover:bg-emerald-50 disabled:opacity-30'
          >
            <FaMinus />
          </button>
          <span className='font-bold text-lg w-8 text-center'>{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(max, q + 1))}
            disabled={qty >= max}
            className='p-2 rounded-lg hover:bg-emerald-50 disabled:opacity-30'
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <div className='flex flex-wrap items-center gap-4'>
        <button
          onClick={handleBorrow}
          disabled={isPending}
          className='btn bg-amber-500 hover:bg-amber-600 text-white border-none px-8 shadow-lg'
        >
          {isPending ? 'Borrowing...' : 'Borrow This Book'}
        </button>
        <WishlistButton bookId={bookId} initialLiked={initialLiked} />
      </div>
    </>
  );
};

export default BorrowSection;