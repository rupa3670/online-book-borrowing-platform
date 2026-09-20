import Link from 'next/link';
import { FaTrashAlt } from 'react-icons/fa';
import { BookImage } from './Shared';

const WishlistCard = ({ item, onRemove, removing }) => (
  <div className='flex gap-4 bg-white border border-emerald-100 rounded-2xl p-3 shadow-sm hover:shadow-md transition'>
    <BookImage src={item.image_url} alt={item.title} />
    <div className='flex flex-col min-w-0 flex-1'>
      <h3 className='font-bold text-emerald-900 line-clamp-2 leading-snug'>{item.title}</h3>
      <p className='text-sm text-gray-500 line-clamp-1'>by {item.author}</p>
      <span className='w-fit mt-2 px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold'>
        {item.category}
      </span>
      <div className='flex gap-2 mt-auto'>
        <Link href={`/book-details/${item.bookId}`} className='btn btn-xs btn-cta'>View</Link>
        <button
          onClick={() => onRemove(item.bookId)}
          disabled={removing}
          aria-label={`Remove ${item.title} from wishlist`}
          className='btn btn-xs btn-outline btn-error gap-1'
        >
          <FaTrashAlt /> Remove
        </button>
      </div>
    </div>
  </div>
);

export default WishlistCard;