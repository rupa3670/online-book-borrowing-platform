'use client';
import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const QuantitySelector = ({ max }) => {
  const [qty, setQty] = useState(1);

  return (
    <div className='flex items-center gap-4 border w-fit px-4 py-2 rounded-xl bg-white shadow-sm'>
      <button
        onClick={() => setQty((q) => Math.max(1, q - 1))}
        disabled={qty <= 1}
        className='p-1 hover:text-emerald-500 disabled:opacity-30'
      >
        <FaMinus />
      </button>
      <span className='font-bold text-lg px-2 text-gray-600'>{qty}</span>
      <button
        onClick={() => setQty((q) => Math.min(max, q + 1))}
        disabled={qty >= max}
        className='p-1 hover:text-emerald-500 disabled:opacity-30'
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default QuantitySelector;