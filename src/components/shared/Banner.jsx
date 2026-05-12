import Link from 'next/link';
import React from 'react';
import bannerImg from '@/assets/hero.jpg'
import Image from 'next/image';

const Banner = () => {
    return (
        <div className='hero min-h-125 overflow-hidden ' style={{ backgroundImage:
                `url(${bannerImg.src})`,
                backgroundSize:'cover',
                backgroundPosition:'center'
            }} >
             
          <div className='hero-content text-center text-white'>
           
     <div className='max-w-lg'>
     <h1 className='text-4xl font-bold'>Find Your Next Read</h1>
        <p className='py-4 text-md text-g'>Explore our vast collection of books from Story to Tech.Start your reading journey with us today.</p>
     <Link href={'/all-books'}><button className='btn btn btn-accent font-medium text-white '>Browse Now</button></Link>

        </div>
            </div>
        </div>
    );
};

export default Banner;