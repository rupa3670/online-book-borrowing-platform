"use client"
import React, { useEffect } from 'react';
import logo from '@/assets/logo.png'
import Link from 'next/link';
import Image from 'next/image';
import NavLink from './NavLink';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
const Navbar = () => {
  const{data:session,isPending,error}=authClient.useSession();
  console.log(session)
  const user= session?.user;
  console.log(user)
  const router = useRouter();
useEffect(()=>{
  if(session){
    console.log(session);
  }
},[session]);

  const handleLogout= async ()=>{
    await authClient.signOut({
      fetchOptions:{
        onSuccess:()=>{
          toast.success("Logged out successfully");
          router.push('/login')
        },
      },

    });
  }
    return (
        <div className='sticky top-0 z-50'>
            <div className="navbar bg-green-50 shadow-sm px-4 md:px-10">
  <div className="navbar-start">
    <NavLink
     href={'/'}>
      <Image src={logo} alt="Book logo" 
      width={50}
      height={50}/>
     </NavLink>
     </div>
    <div className='navbar-center'>
      
      <ul  className='flex items-center  gap-3 md:gap-5'>
        <li><NavLink href={'/'}>Home</NavLink></li>
        <li><NavLink href={'/all-books'}>All Books</NavLink></li>
        <li><NavLink href={'/my-profile'}>My Profile</NavLink></li>
      </ul>
    </div>
    
    
  
  <div className='navbar-end gap-3'>
    {user ?
    <div className='flex items-center gap-3'>

      <span className='hidden md:block font-medium text-emerald-800'>
{user?.name}
      </span>
      <button onClick={handleLogout} className='btn btn-sm btn-outline text-emerald-600'>
Logout
      </button>
    </div>:(
      <Link href={'/login'}><button className='btn bg-emerald-700 text-white'>Login</button></Link>
    )}
    
  </div>
</div>
        </div>
    );
};

export default Navbar;