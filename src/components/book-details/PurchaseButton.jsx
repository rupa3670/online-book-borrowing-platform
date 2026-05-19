"use client"
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const PurchaseButton = ({bookTitle}) => {

    const{data:session}=authClient.updateSession();
    const router=useRouter();

    const handlePurchase=()=>{
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