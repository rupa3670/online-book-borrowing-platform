'use client'
import { authClient } from '@/lib/auth-client';
import { router, useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UpdateProfilePage = () => {
const{data:session,isPending}=authClient.useSession();

const router=useRouter();
const[name,setName]=useState(session?.user?.name || "");

const[image,setImage]=useState(session?.user?.image || "");
const [isSubmitting, setIsSubmitting]=useState(false);

useEffect(()=>{
    if(!isPending){
        if(!session){
            toast.error("Please log in to access this page");

            router.push("/login");
        }
    else{
        setName(session.user.name || "");

        setImage(session.user.image || "");
    }    
    }
},[session,router,isPending]);

const handleUpdate=async (e)=>{
    e.preventDefault();

    if(!name.trim() || !image.trim()){
        toast.error("Both Name and Image URL are required");
        return;
    }
  setIsSubmitting(true);
try{
    const{data,error}=await authClient.updateUser({
        name:name,
        image:image,
    });
    if(error){
        toast.error(error.message || "Failed to update profile");
        return;
    }
    toast.success("Profile updated successfully!");
}  
catch(err){
    toast.error("Something went wrong. Please try again.");
}
finally{
    setIsSubmitting(false);
}
};

if(isPending){
    return(
        <div className='min-h-[70vh] flex flex-col justify-center items-center gap-2'>
            <span className='loading loading-spinner loading-lg items-center text-emerald-600'></span>
            <p className='text-xs text-gray-400 font-medium'>Loading session...</p>
        </div>
    )
}
 
    return (
        <div className='max-w-md mx-auto px-4 py-16 min-h[80vh] flex flex-col justify-center'>
<div className='mb-4'>
    <Link href={'/my-profile'}>
    <button className='btn btn-outline text-emerald-900 text-sm font-medium'>Back to Profile</button>
    </Link>
    </div> 
    <div className='bg-white p-8 rounded-3xl shadow-xl border border-slate-100'>
    <h2 className='text-2xl font-bold text-slate-800 mb-1 text-center'>Update Profile</h2> 
    <p className='text-sm text-gray-500 text-center mb-6'>Change Your Display Name And Photo URL</p>  
    <form  onSubmit={handleUpdate} className='space-y-5'>
        <div className='form-control w-full'>
            <label className='label font-semibold text-sm text-slate-600'>Name</label>
            <input type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder = "Enter your name" className='input input-bordered w-full focus:outline-emerald-600 border-slate-200'   />
            
            
        </div>

         <div className='form-control w-full'>
            <label className='label font-semibold text-sm text-slate-600'>Photo URL</label>
            <input type="url"
            value={image}
            onChange={(e)=>setName(e.target.value)}
            placeholder = "https://example.com/photo.jpg" className='input input-bordered w-full focus:outline-emerald-600 border-slate-200'/>
            
     </div>       
  <button 
  type='submit'
  disabled={isSubmitting}
  className='btn btn-success font-bold mt-4'
  >
{isSubmitting ?(
    <span className='loading loading-spinner loading-sm'></span>
) :(
    "Update Information"
)}
    </button>      
 </form> 
        </div>           
        </div>
    );
};

export default UpdateProfilePage;