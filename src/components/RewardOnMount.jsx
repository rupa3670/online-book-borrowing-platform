'use client';
import { useEffect, useRef } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { recordLoginAndGetStatus } from '@/actions/userActivity';
import { FaGift, FaHandHoldingHeart, FaFireAlt } from 'react-icons/fa';

const REWARD_FLAG_KEY = 'rewardChecked';

const RewardOnMount = () => {
    const { data: session } = authClient.useSession();
    const hasChecked = useRef(false);

    useEffect(() => {
        const email = session?.user?.email;
        if (!email || hasChecked.current) return;

        const alreadyDone = sessionStorage.getItem(REWARD_FLAG_KEY);
        if (alreadyDone === email) return; // এই ট্যাবে একবারই চেক হবে

        hasChecked.current = true;

        const check = async () => {
            try {
                const activity = await recordLoginAndGetStatus(email);
                sessionStorage.setItem(REWARD_FLAG_KEY, email);

                if (!activity) return;

                if (activity.status === 'new') {
                    toast.success('Welcome! Happy reading!', {
                        icon: <FaGift className='text-emerald-600' />,
                    });
                } else if (activity.status === 'returning') {
                    toast.success('Welcome back! We missed you.', {
                        icon: <FaHandHoldingHeart className='text-rose-500' />,
                    });
                } else if (activity.newBadges?.length > 0) {
                    activity.newBadges.forEach((b) =>
                        toast.success(`New badge: ${b.label}`, {
                            icon: <FaGift className='text-amber-500' />,
                        })
                    );
                } else if (activity.streak >= 2) {
                    toast.success(`Welcome back! ${activity.streak}-day streak`, {
                        icon: <FaFireAlt className='text-orange-500' />,
                    });
                }
            } catch (e) {
                console.log('Reward check failed:', e);
            }
        };

        check();
    }, [session]);

    return null; // কোনো UI render করবে না, শুধু কাজ করবে
};

export default RewardOnMount;