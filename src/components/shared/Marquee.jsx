import React from 'react';
import Marquee from "react-fast-marquee";
const MarqueeSection = ({books}) => {
 return (
       <div className='bg-emerald-700 border-y border-emerald-500 shadow-sm'>
        <Marquee pauseOnHover={true} speed={70} gradient={false}>{books.map((book)=>(
            <span key={book.id} className='text-white font-medium text-lg mx-10'>New Arrives:<span className='text-sm'>{book.title}</span>
            <span className='ml-4'>| Special Discount on Memberships...</span>
            </span>
        ))}</Marquee>
         
        </div>
    );
};

export default MarqueeSection;