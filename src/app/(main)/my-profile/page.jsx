'use client'
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaUserEdit } from 'react-icons/fa';
import MyLibrary from '@/components/profile/MyLibrary';

const MyProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isPending && !session) {
            toast.warn("Please log in this page!", {
                position: "top-center",
                autoClose: 2000,
            });
            setTimeout(() => {
                router.push('/login');
            }, 500);
        }
    }, [session, isPending, router]);

    if (isPending) {
        return (
            <div className='min-h-[70vh] flex justify-center items-center'>
                <span className='loading loading-spinner loading-lg text-emerald-600'></span>
            </div>
        )
    }
    if (!session) return null;

    const user = session?.user;
    const defaultAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`;
    const memberSince = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })
        : null;

    return (
        <div className='bg-gradient-to-br from-emerald-50 via-white to-amber-50 min-h-screen'>
            <div className='max-w-4xl mx-auto px-4 py-12'>
                {/* Profile card */}
                <div className='bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden'>
                    <div className='h-28 bg-gradient-to-r from-emerald-600 to-teal-500'></div>

                    <div className='px-6 md:px-10 pb-8'>
                        <div className='flex flex-col md:flex-row md:items-end gap-4 -mt-14'>
                            <div className='avatar'>
                                <div className='w-28 rounded-full ring ring-white ring-offset-2 ring-offset-emerald-100'>
                                    <img
                                        src={user?.image || defaultAvatar}
                                        alt={user?.name || "User Avatar"}
                                        className='object-cover w-full h-full'
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = defaultAvatar;
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='flex-1 text-center md:text-left'>
                                <h1 className='text-2xl md:text-3xl font-extrabold text-emerald-900'>
                                    {user?.name}
                                </h1>
                                <p className='text-emerald-600 font-medium break-all'>{user?.email}</p>
                                {memberSince && (
                                    <p className='text-xs text-gray-400 mt-1'>Member since {memberSince}</p>
                                )}
                            </div>

                            <Link
                                href={'/my-profile/update'}
                                className='btn bg-amber-500 hover:bg-amber-600 text-white border-none gap-2 self-center md:self-auto'
                            >
                                <FaUserEdit /> Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Borrowed books + Wishlist */}
                <MyLibrary />
            </div>
        </div>
    );
};

export default MyProfilePage;