import { FaUndo } from 'react-icons/fa';
import { BookImage, formatDate, getStatus } from './Shared';

const BorrowCard = ({ item, onReturn, returning }) => {
  const st = getStatus(item);
  const returned = item.status === 'returned';

  return (
    <div className={`flex gap-4 bg-white border rounded-2xl p-3 shadow-sm hover:shadow-md transition ${st.overdue ? 'border-red-300 ring-1 ring-red-100' : 'border-emerald-100'} ${returned ? 'opacity-70' : ''}`}>
      <BookImage src={item.image_url} alt={item.title} />

      <div className='flex flex-col min-w-0 flex-1'>
        <h3 className='font-bold text-emerald-900 line-clamp-2 leading-snug'>{item.title}</h3>
        <p className='text-sm text-gray-500 line-clamp-1'>by {item.author}</p>

        <div className='flex flex-wrap items-center gap-2 mt-2'>
          <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${st.badge} ${st.overdue ? 'animate-pulse' : ''}`}>
            {st.icon} {st.label}
          </span>
          <span className='text-xs text-gray-500'>{item.qty} {item.qty > 1 ? 'copies' : 'copy'}</span>
        </div>

        <div className='text-xs text-gray-500 mt-2 space-y-0.5'>
          <p>Borrowed: {formatDate(item.borrowedAt)}</p>
          {returned ? (
            <p>Returned: {formatDate(item.returnedAt)}</p>
          ) : (
            <p className={st.overdue ? 'text-red-600 font-semibold' : ''}>
              Return by: {formatDate(item.dueDate)}{st.note && ` (${st.note})`}
            </p>
          )}
        </div>

        {!returned && (
          <button
            onClick={() => onReturn(item._id, item.title)}
            disabled={returning}
            aria-label={`Return ${item.title}`}
            className='btn btn-xs btn-cta gap-1 mt-3 w-fit'
          >
            <FaUndo /> {returning ? 'Returning...' : 'Return Book'}
          </button>
        )}
      </div>
    </div>
  );
};

export default BorrowCard;