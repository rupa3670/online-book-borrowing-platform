"use client"
import React from 'react';
import { IoStar } from "react-icons/io5";
import {  Mousewheel, Pagination,Navigation } from 'swiper/modules';
import { Swiper,SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/pagination'
const Review = () => {
    const userReviews=[
       { id: 1, name: "Tanvir Hasan", role: "Avid Reader", comment: "The collection is amazing! I found many rare tech books here.", rating: 5 },
    { id: 2, name: "Maliha Islam", role: "University Student", comment: "Borrowing process is very smooth. Next.js integration makes it fast!", rating: 4 },
    { id: 3, name: "Rakib Ahmed", role: "Software Engineer", comment: "Great UI/UX. The dark mode and the book details page are top-notch.", rating: 5 },
        { id: 4, name: "Nabila Zaman", role: "Book Blogger", comment: "I love the community reviews. It helps me choose the right books for my blog.", rating: 5 },
        { id: 5, name: "Sifat Ullah", role: "Researcher", comment: "The academic section is very resourceful. Highly recommended for students.", rating: 4 },
        { id: 6, name: "Anika Tahsin", role: "Casual Reader", comment: "Fast delivery and great customer support. Will definitely use again!", rating: 5 },
    
  
    ];
    return (
        <div className='py-20 bg-gray-50/50'>
            <div className='max-w-7xl mx-auto  text-center px-4'>
        <h2 className='text-3xl font-bold text-emerald-900 mb-10'>What Our Readers Say</h2>
        <p className='text-gray-500 mb-12'>Real stories from our awesome community</p>
        <Swiper modules={[Pagination,Navigation,Mousewheel]}
        slidesPerView={1}
        autoplay={false}
        grabCursor={true}
        navigation={true}
        mousewheel={true}
        breakpoints={
            {
                640:{slidesPerView:2},
                1024:{slidesPerView:3},
            }
        }
        className="pb-16"
        >
 {userReviews.map((rev)=>(
      <SwiperSlide key={rev.id}>
 <div  className='bg-white p-4 rounded-2xl shadow-sm  border-emerald-100 hover:shadow-lg'>
     <div className='flex gap-1 mb-4'>{[...Array(5)].map((_,i)=>(
                        <span key={i}className={i<rev.rating?"text-yellow-400":"text-gray-300"}><IoStar/></span> ))}
                        </div>
 <p className='text-gray-500 mb-6'>{rev.comment}</p>
    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-emerald-600 items-center justify-center text-white font-bold'>
                            {rev.name[0]}
                        </div>
                        <h4 className='font-bold text-emerald-800'>{rev.name}</h4>
                    </div>
                   </div>
      </SwiperSlide> 
                ))}
        </Swiper>
      
            </div>
            
        </div>
    );
};

export default Review;