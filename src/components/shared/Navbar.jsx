import React from 'react';
import logo from '@/assets/logo.png'
import Link from 'next/link';
import Image from 'next/image';
import NavLink from './NavLink';
const Navbar = () => {
    return (
        <div>
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
    
    
  
  <div className='navbar-end'>
    <button className='btn'>Login</button>
  </div>
</div>
        </div>
    );
};

export default Navbar;