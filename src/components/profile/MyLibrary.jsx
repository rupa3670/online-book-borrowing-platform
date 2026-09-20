'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getMyBorrows, getMyWishlist, toggleWishlist, returnBook } from '@/actions/userLibrary';
import { SkeletonCard, EmptyState } from './library/Shared';
import LibraryStats from './library/LibraryStats';
import LibraryTabs from './library/LibraryTabs';
import BorrowCard from './library/BorrowCard';
import WishlistCard from './library/WishlistCard';

const MyLibrary = () => {
  const [tab, setTab] = useState('borrowed');
  const [borrows, setBorrows] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [returningId, setReturningId] = useState(null);

  useEffect(() => {
    const load = async () => {
      const [b, w] = await Promise.all([getMyBorrows(), getMyWishlist()]);
      setBorrows(b);
      setWishlist(w);
      setLoading(false);
    };
    load();
  }, []);

  const handleRemove = async (bookId) => {
    setRemovingId(bookId);
    const res = await toggleWishlist(bookId);
    if (res.success) {
      toast.success(res.message);
      setWishlist((list) => list.filter((i) => i.bookId !== bookId));
    } else toast.error(res.message);
    setRemovingId(null);
  };

  const handleReturn = async (borrowId, title) => {
    if (!window.confirm(`Return "${title}"? This action cannot be undone.`)) return;
    setReturningId(borrowId);
    const res = await returnBook(borrowId);
    if (res.success) {
      toast.success(res.message);
      setBorrows((list) =>
        list.map((i) => (i._id === borrowId ? { ...i, status: 'returned', returnedAt: new Date().toISOString() } : i))
      );
    } else toast.error(res.message);
    setReturningId(null);
  };

  const sortedBorrows = [...borrows].sort((a, b) => {
    const aDone = a.status === 'returned';
    const bDone = b.status === 'returned';
    if (aDone !== bDone) return aDone ? 1 : -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const activeBorrows = borrows.filter((b) => b.status !== 'returned');
  const activeCopies = activeBorrows.reduce((sum, b) => sum + (b.qty || 0), 0);
  const overdueCount = activeBorrows.filter((b) => new Date(b.dueDate) < new Date()).length;

  return (
    <section className='mt-10'>
      <LibraryStats
        loading={loading}
        activeCopies={activeCopies}
        overdueCount={overdueCount}
        wishlistCount={wishlist.length}
      />

      <LibraryTabs
        tab={tab}
        setTab={setTab}
        borrowedCount={activeBorrows.length}
        wishlistCount={wishlist.length}
        loading={loading}
      />

      {loading && (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {!loading && tab === 'borrowed' && (
        sortedBorrows.length === 0 ? (
          <EmptyState text='You have not borrowed any book yet.' />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {sortedBorrows.map((item) => (
              <BorrowCard
                key={item._id}
                item={item}
                onReturn={handleReturn}
                returning={returningId === item._id}
              />
            ))}
          </div>
        )
      )}

      {!loading && tab === 'wishlist' && (
        wishlist.length === 0 ? (
          <EmptyState text='Your wishlist is empty. Save books you love to find them here later.' />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {wishlist.map((item) => (
              <WishlistCard
                key={item._id}
                item={item}
                onRemove={handleRemove}
                removing={removingId === item.bookId}
              />
            ))}
          </div>
        )
      )}
    </section>
  );
};

export default MyLibrary;