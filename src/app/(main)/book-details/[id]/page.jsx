import { getBookData } from '@/actions/getBooksData';
import PurchaseButton from '@/components/book-details/PurchaseButton';
import Link from 'next/link';
import React from 'react';
import { FaAngleDoubleRight, FaArrowLeft, FaMinus, FaPaperPlane, FaPlus } from 'react-icons/fa';

const BookDetailsPage = async({params}) => {
    const{id}=await params;

    const book =await getBookData(id);
    if(!book){
        return<div className='text-center py-20 text-2xl'>Book is not found!</div>
    }
    return (
        <div className='max-w-6xl mx-auto px-4 py-12'>
            <Link href={'/all-books'} className='btn btn-ghost mb-8 text-emerald-700'><FaArrowLeft/> Back to Library</Link>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-6 md:p-12 rounded-3xl shadow-xl border border-emerald-50'>

             <div className='flex  items-center md:items-start'>
                 <div className='w-full max-w-[320px] lg:max-w-[380px]'>
                <img src={book.image_url} alt={book.title} className='w-full  aspect-[3/4] object-cover rounded-2xl shadow-xl' />
            </div>
    {/* <div className='w-full  max-w-[380px] border-t pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
    <div >
        <p className='text-gray-400 text-sm'>Rating</p>
        <p className='font-bold text-emerald-800'>4.8</p>
    </div>
     <div >
        <p className='text-gray-400 text-sm'>Language</p>
        <p className='font-bold text-emerald-800'>English</p>
    </div>
     <div >
        <p className='text-gray-400 text-sm'>Available</p>
        <p className='font-bold   text-emerald-800'>Yes</p>
    </div>
     <div >
        <p className='text-gray-400 text-sm'>ID</p>
        <p className='font-bold text-emerald-800'>{book.id}</p>
    </div>

</div>         */}
             </div>
             
 <div className='w-full  flex flex-col'>
<div className=' mb-4 '>

  <span className='badge badge-accent px-4 py-3 font-semibold'>  {book.category}</span>
    </div>
    
<h1 className='text-4xl font-bold text-emerald-900 mb-4'>{book.title}</h1>
<p className='text-2xl font-bold text-emerald-400 mb-2'>{book.author}</p>
<p className='text-lg text-gray-500 mb-5 leading-relaxed'>{book.description}</p>

<div className='mb-8'>
    <p className='text-sm font-bold text-gray-700 mb-3'>Available Quantity</p>
    <div className='flex items-center gap-4 border w-fit px-4 py-2 rounded-xl bg-white shadow-sm'>

        {/* <button className='p-1 hover:text-emerald-500'><FaMinus/></button> */}
        <span className='font-bold text-lg px-2'>{book.available_quantity} Copies</span>
        {/* <button className='p-1 hover:text-emerald-500'><FaPlus/></button> */}

    </div>
    </div>

    
{/* <div className='relative w-full max-w-2xl'>
    <h2 className='mb-3 font-bold text-emerald-800 text-xl'>Review</h2>
    <textarea placeholder="Share your opinion" className="textarea textarea-success"></textarea>
    <button className='absolute bottom-4 right-30 p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 ' title='Post Review'>
<FaAngleDoubleRight/>
    </button>
</div> */}

 <div className='flex flex-wrap gap-4 mt-3'> 
     {/* <button className='btn btn-outline btn-accent  border-2'>
      Add to Wishlist  
    </button>  */}
    <div className='flex-1'><PurchaseButton bookTitle={book.title}/></div>
 </div>  


 </div> 
            </div>       
        </div>
    );
};

export default BookDetailsPage;