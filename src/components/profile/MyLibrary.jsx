'use client';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { getMyBorrows, getMyWishlist, toggleWishlist, returnBook } from '@/actions/userLibrary';
import { SkeletonCard, EmptyState, ErrorState } from './library/Shared';
import LibraryStats from './library/LibraryStats';
import LibraryTabs from './library/LibraryTabs';
import BorrowCard from './library/BorrowCard';
import WishlistCard from './library/WishlistCard';

const MyLibrary = () => {
  const [tab, setTab] = useState('borrowed');
  const [borrows, setBorrows] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [returningId, setReturningId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const [b, w] = await Promise.all([getMyBorrows(), getMyWishlist()]);
      setBorrows(b);
      setWishlist(w);
    } catch (e) {
      console.error('Failed to load library:', e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleRemove = async (bookId) => {
    setRemovingId(bookId);
    try {
      const res = await toggleWishlist(bookId);
      if (res.success) {
        toast.success(res.message);
        setWishlist((list) => list.filter((i) => i.bookId !== bookId));
      } else toast.error(res.message);
    } catch (e) {
      toast.error('Something went wrong. Please try again.');
    }
    setRemovingId(null);
  };

  const handleReturn = async (borrowId, title) => {
    if (!window.confirm(`Return "${title}"? This action cannot be undone.`)) return;
    setReturningId(borrowId);
    try {
      const res = await returnBook(borrowId);
      if (res.success) {
        toast.success(res.message);
        setBorrows((list) =>
          list.map((i) => (i._id === borrowId ? { ...i, status: 'returned', returnedAt: new Date().toISOString() } : i))
        );
      } else toast.error(res.message);
    } catch (e) {
      toast.error('Something went wrong. Please try again.');
    }
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

  if (!loading && error) {
    return (
      <section className='mt-10'>
        <ErrorState text='Could not load your library. Please check your connection and try again.' onRetry={load} />
      </section>
    );
  }

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