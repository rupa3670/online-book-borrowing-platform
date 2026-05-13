import React from 'react';
import { IoStar } from "react-icons/io5";
const Review = () => {
    const userReviews=[
       { id: 1, name: "Tanvir Hasan", role: "Avid Reader", comment: "The collection is amazing! I found many rare tech books here.", rating: 5 },
    { id: 2, name: "Maliha Islam", role: "University Student", comment: "Borrowing process is very smooth. Next.js integration makes it fast!", rating: 4 },
  
    ];
    return (
        <div className='mb-10 bg-white'>
            <div className='max-w-7xl mx-auto  text-center'>
                <h2 className='text-3xl font-bold text-emerald-900 mb-10'>What Our Readers Say</h2>
                <div className='grid md:grid-cols gap-8'>{userReviews.map((rev)=>(
                   <div key={rev.id} className='bg-white p-4 rounded-2xl shadow-sm  border-emerald-100 hover:shadow-lg'>
                    <div className='flex gap-1 mb-4'>{[...Array(5)].map((_,i)=>(
                        <span key={i}className={i<rev.rating?"text-yellow-400":"text-gray-300"}><IoStar/></span>
                    ))}</div>
                    <p className='text-gray-500 mb-6'>{rev.comment}</p>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-emerald-600 items-center justify-center text-white font-bold'>
                            {rev.name[0]}
                        </div>
                        <h4 className='font-bold text-emerald-800'>{rev.name}</h4>
                    </div>
                   </div> 
                ))}</div>
            </div>
            
        </div>
    );
};

export default Review;