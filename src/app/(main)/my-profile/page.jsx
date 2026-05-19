'use client'
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const MyProfilePage = () => {
    const{data:session,isPending}=authClient.useSession();
    const router=useRouter();

    useEffect(()=>{
         if(!isPending && !session){
                        toast.warn("Please log in this page!",{
                            position:"top-center",
                            autoClose:2000,
                        });
                        setTimeout(()=>{
                            router.push('/login');
                        },500);
             }
    },[session,isPending,router]);

   if(isPending){
        return(
            <div className='min-h-[70vh] flex justify-center items-center'>
                <span className='loading loading-spinner loading-lg text-emerald-600'></span>
            </div>
        )
    }
    if(!session) return null;
const user=session?.user;
const defaultAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`;

    return (
        <div className='max-w-4xl mx-auto px-4 py-16'>
     <div className='bg-white rounded-3xl shadow-xl border border-emerald-50 overflow-hidden'>      
           <div className='h-32 bg-gradient-to-r from-emerald-500 to-teal-600'>
            </div> 
  <div className='px-8 pb-10'>
    <div className='relative flex flex-col items-center -mt-16'>

   <div className='avatar'>
<div className='w-32 rounded-full'>
    <img src={user?.image || defaultAvatar} alt={user?.name ||"User Avatar"}  className='object-cover w-full h-full'
    onError={(e)=>{
        e.target.src=defaultAvatar;
    }}
    />
    
</div>
 </div>      
<div className='text-center mt-6'>
    <h1 className='text-3xl font-bold text-slate-800'>{user?.name}</h1>
    <p className='text-emerald-600 font-medium'>{user?.email}</p>
</div>
</div>
<div className='grid grid-cols-1 md:grid-cols gap-6 mt-10 border-t border-slate-100 pt-10'>

<div className='p-4 bg-slate-50 rounded-2xl border border-slate-100'>
    <p className='text-xs text-gray-400 uppercase font-bold mb-1'>User ID</p>
    <p className='text-slate-700 text-sm'>{user?.id}</p>
</div>
<div className='p-4 bg-slate-50 rounded-2xl border-slate-100'>
    <p className='text-xs text-gray-400 uppercase font-bold'>account Status</p>
    <p className='text-emerald-600 font-bold'>Verified Member</p>
</div>
</div>

<div className='mt-10 flex justify-center'>
<Link href={'/my-profile/update'}>
<button className='btn bg-emerald-600 text-white'>
    Update Information
</button>
</Link>
</div>
 </div>          
           
</div> 
  </div>
    );
};

export default MyProfilePage;