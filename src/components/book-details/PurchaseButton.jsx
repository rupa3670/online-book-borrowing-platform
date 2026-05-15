"use client"
import React from 'react';
import { toast } from 'react-toastify';

const PurchaseButton = ({bookTitle}) => {
    const handlePurchase=()=>{
        toast.success(` successfully purchased!`)
    };
    return (
        <button onClick={handlePurchase} className='btn btn-outline btn-accent  border-2 '>
Purchase Now
        </button>
    );
};

export default PurchaseButton;