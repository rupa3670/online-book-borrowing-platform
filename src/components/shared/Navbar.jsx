import React from 'react';
import logo from '@/assets/logo.png'
import Link from 'next/link';
import Image from 'next/image';
const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm px-4 md:px-10">
  <div className="navbar-start">
    <Link
     href={'/'}>
      <Image src={logo} alt="Book logo" 
      width={50}
      height={50}/>
     </Link>
     </div>
    <div className='navbar-center'>
      
      <ul  className='flex items-center  gap-3 md:gap-5'>
        <li><Link href={'/'}>Home</Link></li>
        <li><Link href={'/all-books'}>All Books</Link></li>
        <li><Link href={'/my-profile'}>My Profile</Link></li>
      </ul>
    </div>
    
    
  
  <div className='navbar-end'>
    <button className='btn'>Login</button>
  </div>
</div>
        </div>
    );
};

export default Navbar;