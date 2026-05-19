
import getAllBooksData from '@/actions/getBooksData';
import DetailsButton from '@/components/all-books/DetailsButton';
import SearchBar from '@/components/all-books/SearchBar';
import Link from 'next/link';
import React, { Suspense } from 'react';


export const AllBookPage =async ({searchParams}) => {
const allBooks=await getAllBooksData();

const params = await searchParams;
const query=params?.query ||"";
const category=params?.category || "All"
const searchTerm=query.toLowerCase();

const filteredBooks=allBooks.filter((book)=>{
    const matchesSearch =book.title.toLowerCase().includes(searchTerm);
    const matchesCategory=category==="All" || book.category===category;
    return matchesCategory && matchesSearch
});

    return (
        <div className='max-w-7xl mx-auto px-4 py-10 '>
           
            <div className='mb-12 text-center'>
                <h1 className='text-4xl font-bold text-emerald-900 mb-4'>Explore Library</h1>
                <p className='text-gray-500 mb-8'>Find your next favorite book from our collection</p>
                <Suspense fallback={<div className='h-14 w-full max-w-2xl bg-gray-100 animation-pulse rounded-full mx-auto'/>}><SearchBar/></Suspense>
            </div>
            <div className='flex flex-col md:flex-row gap-8 items-start'>
     <aside className='w-full md:w-64 shrink-0'>
        <div className='bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm sticky top-24'>
<h3 className='font-bold text-lg mb-4 text-emerald-900 border-b pb-2 text-left'>Categories</h3>
<div className='flex flex-col gap-3'>
    {["All","Story",'Tech',"Science"].map((cat)=>(
<Link  key={cat} href={`?category=${cat}${query ? `&query=${query}`:''}`} className={`px-4 py-2 rounded-lg  text-sm font-medium text-left ${
    category===cat?'bg-emerald-600 text-white shadow-md':'hover:bg-emerald-50 text-gray-600'
}`}>{cat}</Link>
    ))}
</div>
        </div>
     </aside>

            
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8'>
                {filteredBooks.length>0?(
                    filteredBooks.map((book)=>(
                        <div key={book.id} className='card bg-base-100 shadow-md border border-emerald-50 hover:shadow-sm'>
<figure>
    <img src={book.image_url}
    alt={book.title}
    className='h-72 w-full object-cover rounded-xl '
    />
</figure>
<div className='card-body p-5'>
    <h2 className='card-title text-emerald-800 text-lg line-clamp-1'>{book.title}</h2>
    {/* <p className='text-sm text-gray-500 mb-2 '>Category:{book.category}</p> */}
    <div className='card-actions mt-auto'>
        {/* <Link href={`/book-details/${book.id}`} className="w-full">
        <button className='btn btn-accent btn-block text-white hover:bg-emerald-700'>
          Details  </button></Link> */}
          <DetailsButton bookId={book.id}/>
    </div>
</div>
                        </div>
                    ))
                ):(
                    <div className='col-span-full text-center py-20 '>
                        <div className='bg-emerald-50 inline-block p-10 rounded-md mb-4'>

                            <h3 className='text-2xl text-emerald-900 font-semibold'>
                                No books found!
                            </h3>
                            <p className='text-gray-500 mt-2'>
                                Try searching with a different title.
                            </p>
                        </div>
                    </div>
                )}
                 </div>
            </div>
           
        </div>
    );
};

export default AllBookPage;