'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';
import { toggleWishlist } from '@/actions/userLibrary';

const WishlistButton = ({ bookId, initialLiked = false }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [isPending, startTransition] = useTransition();
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const router = useRouter();

  const handleClick = () => {
    if (sessionLoading) return;

    if (!session) {
      toast.warn('Please log in to use wishlist!');
      router.push('/login');
      return;
    }

    startTransition(async () => {
      const res = await toggleWishlist(bookId);
      if (res.success) {
        setLiked(res.added);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className='btn btn-outline btn-accent border-2'
    >
      {liked ? <FaHeart className='text-red-500' /> : <FaRegHeart />}
      {liked ? 'In Wishlist' : 'Add to Wishlist'}
    </button>
  );
};

export default WishlistButton;