import { FaBookOpen, FaHeart } from 'react-icons/fa';

const LibraryTabs = ({ tab, setTab, borrowedCount, wishlistCount, loading }) => {
  const tabClass = (name) =>
    `flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition ${
      tab === name ? 'bg-emerald-600 text-white shadow' : 'bg-white border border-emerald-200 text-gray-600 hover:bg-emerald-50'
    }`;

  const Count = ({ n, active, tone }) =>
    !loading && n > 0 ? (
      <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${active ? 'bg-white/25' : tone}`}>{n}</span>
    ) : null;

  return (
    <div className='flex gap-3 mb-6'>
      <button onClick={() => setTab('borrowed')} className={tabClass('borrowed')}>
        <FaBookOpen /> Borrowed
        <Count n={borrowedCount} active={tab === 'borrowed'} tone='bg-emerald-100 text-emerald-700' />
      </button>
      <button onClick={() => setTab('wishlist')} className={tabClass('wishlist')}>
        <FaHeart /> Wishlist
        <Count n={wishlistCount} active={tab === 'wishlist'} tone='bg-indigo-100 text-indigo-700' />
      </button>
    </div>
  );
};

export default LibraryTabs;