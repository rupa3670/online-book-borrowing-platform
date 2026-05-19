'use client'
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const DetailsButton = ({bookId}) => {
    const{data:session}=authClient.useSession();
    const router=useRouter();
    const handleDetailsClick=()=>{
         if(!session){
                toast.warn("Please log in to borrow this book!",{
                    position:"top-center",
                    autoClose:2000,
                });
                setTimeout(()=>{
                    router.push('/login');
                },500)
     }
else{
    router.push(`/book-details/${bookId}`);
}
    }

    return (
       <button
       onClick={handleDetailsClick} className='btn btn-accent btn-block'
       >View Details</button>
    );
};

export default DetailsButton;