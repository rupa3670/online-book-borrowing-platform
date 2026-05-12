import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className='h-[100vh] flex justify-center items-center flex-col bg-green-50 text-gray-600'>
            <h2 className='font-bold text-5xl mb-3'>404</h2>
            <p className='font-semibold text-2xl'>This page is not found</p>
            <Link href={"/"}><button className='btn btn-accent mt-4'>Back to home</button></Link>
        </div>
        
            
    );
};

export default NotFound;