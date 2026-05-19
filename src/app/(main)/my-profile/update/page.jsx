'use client'
import { authClient } from '@/lib/auth-client';
import { router } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const UpdateProfilePage = () => {
const{data:session,isPending}=authClient.useSession();

const router=useRouter();
const[name,setName]=useState(session?.user?.name || "");

const[image,setImage]=useState(session?.user?.image || "");
const [isSubmitting, setIsSubmitting]=useState(false);

useEffect(()=>{
    if(!isPending){
        if(!session){
            toast.error("Please log in to access this page");

            router.push("/login");
        }
    else{
        setName(session.user.name || "");

        setImage(session.user.image || ""
        );
    }    
    }
},[session,router,isPending]);

const handleUpdate=async (e)=>{
    e.preventDefault();

    if(!name.trim() || !image.trim()){
        toast.error("Both Name and Image URL are required");
        return;
    }
}

    return (
        <div className='max-w-md mx-auto px-4 py-16 min-h[80vh] flex flex-col justify-center'>
<div className='mb-4'>
    <Link href={'/my-profile'}>
    <button className='btn btn-outline text-emerald-900 text-sm font-medium'>Back to Profile</button>
    </Link>
    </div> 
    <div className='bg-white p-8 rounded-3xl shadow-xl border border-slate-100'>
    <h2 className='text-2xl font-bold text-slate-800 mb-1 text-center'>Update Profile</h2> 
    <p className='text-sm text-gray-500 text-center mb-6'>Change Your Display Name And Photo URL</p>  
    <form >
        <div>
            <label></label>
            <input type="text" />
        </div>
 </form> 
        </div>           
        </div>
    );
};

export default UpdateProfilePage;