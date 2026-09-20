import Link from 'next/link';
import { FaBookOpen, FaCheckCircle, FaExclamationTriangle, FaClock } from 'react-icons/fa';

export const DAY = 24 * 60 * 60 * 1000;

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

export const BookImage = ({ src, alt }) => (
  <div className='w-20 h-28 shrink-0 rounded-lg bg-emerald-50 p-1'>
    <img
      src={src}
      alt={alt}
      loading='lazy'
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = '/placeholder-book-cover.png';
      }}
      className='w-full h-full object-contain'
    />
  </div>
);

export const SkeletonCard = () => (
  <div
    className='flex gap-4 bg-white border border-emerald-100 rounded-2xl p-3 animate-pulse'
    role='status'
    aria-label='Loading'
  >
    <div className='w-20 h-28 rounded-lg bg-gray-200' />
    <div className='flex-1 space-y-3 py-1'>
      <div className='h-4 bg-gray-200 rounded w-3/4' />
      <div className='h-3 bg-gray-200 rounded w-1/2' />
      <div className='h-3 bg-gray-200 rounded w-1/3' />
    </div>
  </div>
);

export const EmptyState = ({ text }) => (
  <div className='text-center py-12 bg-emerald-50/60 rounded-2xl border border-dashed border-emerald-200'>
    <p className='text-gray-600 mb-4'>{text}</p>
    <Link href='/all-books' className='btn btn-sm btn-cta'>Browse Books</Link>
  </div>
);

export const ErrorState = ({ text = 'Something went wrong. Please try again.', onRetry }) => (
  <div className='text-center py-12 bg-red-50/60 rounded-2xl border border-dashed border-red-200' role='alert'>
    <p className='text-red-700 mb-4'>{text}</p>
    {onRetry && (
      <button onClick={onRetry} className='btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none'>
        Try Again
      </button>
    )}
  </div>
);

export const getStatus = (item) => {
  if (item.status === 'returned') {
    return {
      label: 'Returned',
      badge: 'bg-gray-100 text-gray-600',
      icon: <FaCheckCircle className='text-gray-400' aria-hidden='true' />,
      note: null,
    };
  }
  const daysLeft = Math.ceil((new Date(item.dueDate) - new Date()) / DAY);
  if (daysLeft < 0) {
    const late = Math.abs(daysLeft);
    return {
      label: 'Overdue',
      badge: 'bg-red-100 text-red-700',
      icon: <FaExclamationTriangle className='text-red-500' aria-hidden='true' />,
      note: `${late} ${late > 1 ? 'days' : 'day'} late`,
      overdue: true,
    };
  }
  if (daysLeft === 0) {
    // amber = warning/caution — kept distinct from violet (reserved for wishlist)
    return {
      label: 'Due today',
      badge: 'bg-amber-100 text-amber-700',
      icon: <FaClock className='text-amber-500' aria-hidden='true' />,
      note: 'Return it today',
    };
  }
  return {
    label: 'Borrowed',
    badge: 'bg-emerald-100 text-emerald-700',
    icon: <FaBookOpen className='text-emerald-500' aria-hidden='true' />,
    note: `${daysLeft} ${daysLeft > 1 ? 'days' : 'day'} left`,
  };
};