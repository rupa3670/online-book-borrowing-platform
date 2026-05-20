"use client"
import { authClient, useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const PurchaseButton = ({bookTitle}) => {

    const{data:session,isPending}=useSession();
    const router=useRouter();

    const handlePurchase=()=>{
    if(isPending) return;
        if(!session){
            toast.warn("Please log in to borrow this book!");
            router.push('/login');
            return;
        }
        toast.success(` successfully borrowing!`)
    };
    return (
        <button onClick={handlePurchase} className='btn btn-outline btn-accent  border-2 '>
Borrow This Book
        </button>
    );
};

export default PurchaseButton;