import { FaBookOpen, FaHeart, FaExclamationTriangle } from 'react-icons/fa';

const LibraryStats = ({ loading, activeCopies, overdueCount, wishlistCount }) => (
  <div className='grid grid-cols-2 gap-4 mb-8'>
    <div className='bg-gradient-to-br from-emerald-700 to-emerald-900 text-white rounded-2xl shadow-lg p-5 flex items-center gap-4'>
      <div className='w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl'><FaBookOpen /></div>
      <div>
        <p className='text-2xl font-extrabold'>{loading ? '-' : activeCopies}</p>
        <p className='text-xs text-emerald-100 font-medium flex items-center gap-1 flex-wrap'>
          Currently Borrowed
          {!loading && overdueCount > 0 && (
            <span className='inline-flex items-center gap-1 bg-red-500/90 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold'>
              <FaExclamationTriangle /> {overdueCount} overdue
            </span>
          )}
        </p>
      </div>
    </div>

    <div className='bg-gradient-to-br from-indigo-500 to-violet-700 text-white rounded-2xl shadow-lg p-5 flex items-center gap-4'>
      <div className='w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl'><FaHeart /></div>
      <div>
        <p className='text-2xl font-extrabold'>{loading ? '-' : wishlistCount}</p>
        <p className='text-xs text-indigo-100 font-medium'>In Wishlist</p>
      </div>
    </div>
  </div>
);

export default LibraryStats;