import { FaBookOpen, FaHeart, FaExclamationTriangle } from 'react-icons/fa';

const LibraryStats = ({ loading, activeCopies, overdueCount, wishlistCount }) => (
  <div className='grid grid-cols-2 gap-4 mb-8'>
    <div className='bg-white border border-emerald-100 rounded-2xl shadow-sm p-5 flex items-center gap-4'>
      <div className='w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-xl text-emerald-600'>
        <FaBookOpen />
      </div>
      <div>
        <p className='text-2xl font-bold text-gray-800'>{loading ? '-' : activeCopies}</p>
        <p className='text-xs text-gray-500 font-medium flex items-center gap-1 flex-wrap'>
          Currently Borrowed
          {!loading && overdueCount > 0 && (
            <span className='inline-flex items-center gap-1 bg-red-50 text-red-600 px-1.5 py-0.5 rounded-full text-[10px] font-semibold'>
              <FaExclamationTriangle /> {overdueCount} overdue
            </span>
          )}
        </p>
      </div>
    </div>

    <div className='bg-white border border-violet-100 rounded-2xl shadow-sm p-5 flex items-center gap-4'>
      <div className='w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-xl text-violet-600'>
        <FaHeart />
      </div>
      <div>
        <p className='text-2xl font-bold text-gray-800'>{loading ? '-' : wishlistCount}</p>
        <p className='text-xs text-gray-500 font-medium'>In Wishlist</p>
      </div>
    </div>
  </div>
);

export default LibraryStats;