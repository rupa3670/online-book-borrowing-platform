'use client';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const WishlistButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      className='btn btn-outline btn-accent border-2'
    >
      {liked ? <FaHeart className='text-red-500' /> : <FaRegHeart />}
      {liked ? 'In Wishlist' : 'Add to Wishlist'}
    </button>
  );
};

export default WishlistButton;