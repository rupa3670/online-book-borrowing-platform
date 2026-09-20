'use server';
import clientPromise from '@/lib/mongodb';

const DAY = 24 * 60 * 60 * 1000;

const BADGE_INFO = {
  welcome: { label: 'Welcome Reader', desc: 'Joined the library' },
  comeback: { label: 'Welcome Back', desc: 'Returned after a break' },
  streak_3: { label: '3-Day Streak', desc: 'Visited 3 days in a row' },
  streak_7: { label: '7-Day Streak', desc: 'Visited 7 days in a row' },
  streak_30: { label: 'Loyal Reader', desc: 'Visited 30 days in a row' },
};

export async function recordLoginAndGetStatus(email) {
  if (!email) return null;

  const client = await clientPromise;
  const db = client.db();
  const users = db.collection('user'); // ⚠️ কালেকশন নাম চেক করো

  const now = new Date();
  const existing = await users.findOne({ email });
  if (!existing) return null;

  const lastLoginAt = existing.lastLoginAt ? new Date(existing.lastLoginAt) : null;
  const createdAt = existing.createdAt ? new Date(existing.createdAt) : now;
  const existingBadges = existing.badges || [];
  const newBadges = [];

  let status = 'regular';
  let streak = existing.loginStreak || 0;

  if (!lastLoginAt) {
    const daysSinceSignup = Math.floor((now - createdAt) / DAY);
    status = daysSinceSignup <= 1 ? 'new' : 'regular';
    streak = 1;
    if (status === 'new' && !existingBadges.includes('welcome')) {
      newBadges.push('welcome');
    }
  } else {
    const daysSinceLastLogin = Math.floor((now - lastLoginAt) / DAY);

    if (daysSinceLastLogin >= 14) {
      status = 'returning';
      streak = 1;
      if (!existingBadges.includes('comeback')) newBadges.push('comeback');
    } else if (daysSinceLastLogin === 0) {
      status = 'regular';
    } else if (daysSinceLastLogin === 1) {
      status = 'regular';
      streak += 1;
    } else {
      status = 'regular';
      streak = 1;
    }
  }

  if (streak === 3 && !existingBadges.includes('streak_3')) newBadges.push('streak_3');
  if (streak === 7 && !existingBadges.includes('streak_7')) newBadges.push('streak_7');
  if (streak === 30 && !existingBadges.includes('streak_30')) newBadges.push('streak_30');

  const updatedBadges = [...new Set([...existingBadges, ...newBadges])];

  await users.updateOne(
    { email },
    { $set: { lastLoginAt: now, loginStreak: streak, badges: updatedBadges } }
  );

  return {
    status,
    streak,
    newBadges: newBadges.map((id) => ({ id, ...BADGE_INFO[id] })),
  };
}

export async function getUserBadges(email) {
  if (!email) return [];
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection('user');

  const user = await users.findOne({ email });
  const badgeIds = user?.badges || [];
  return badgeIds.map((id) => ({ id, ...BADGE_INFO[id] })).filter((b) => b.label);
}