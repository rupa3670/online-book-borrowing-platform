'use client';
import { useEffect, useState } from 'react';
import {
  FaGift,
  FaHandHoldingHeart,
  FaFire,
  FaBolt,
  FaCrown,
} from 'react-icons/fa';
import { getUserBadges } from '@/actions/userActivity';

const BADGE_ICONS = {
  welcome: <FaGift className='text-emerald-600' />,
  comeback: <FaHandHoldingHeart className='text-rose-500' />,
  streak_3: <FaFire className='text-orange-500' />,
  streak_7: <FaBolt className='text-amber-500' />,
  streak_30: <FaCrown className='text-yellow-500' />,
};

const BadgesList = ({ email }) => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const b = await getUserBadges(email);
      setBadges(b);
      setLoading(false);
    };
    if (email) load();
  }, [email]);

  if (loading) {
    return <div className='h-16 bg-gray-100 rounded-2xl animate-pulse mt-6' />;
  }

  if (badges.length === 0) return null;

  return (
    <div className='mt-6'>
      <h3 className='text-sm font-semibold text-slate-600 mb-2'>Your Badges</h3>
      <div className='flex flex-wrap gap-2'>
        {badges.map((b) => (
          <span
            key={b.id}
            title={b.desc}
            className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200'
          >
            {BADGE_ICONS[b.id]} {b.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BadgesList;