import React from 'react';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-green-900  rounded text-white p-10">
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start w-full'>

                <nav className="flex flex-col gap-4">    <h2 className='font-bold text-xl'>MANGO BOOKS</h2>
  <div className='flex gap-3'>
 <a className="link link-hover">Home</a>
<a className="link link-hover">All Books</a>
  <a className="link link-hover">About us</a>
 <a className="link link-hover">Contact</a>
                    </div>


                </nav>
            
            <nav>
                <div className='text-center'>
                    <h6 className='font-medium text-lg  mb-2'>Contact Us</h6>
                    <p className='text-sm'>Dhanmondi, Dhaka, Bangladesh</p>
                </div>
            </nav>
            <nav>
                <div className="flex flex-col items-center gap-3">
                    <p className='font-medium text-lg border-b-1 border-green-200'>social Link</p>
                    <div className='flex gap-3 '>
                        <a>
                            <FaFacebook className='hover:text-blue-600 ' />
                        </a>
                        <a>
                            <FaYoutube className='hover:text-blue-600 ' />
                        </a>
                        <a>
                            <FaTwitter className='hover:text-blue-600 ' />
                        </a>
                    </div>
                </div>
            </nav>
</div>
            <div className='w-full border-t border-gray-200 pt-8 mx-auto mt-8'>
                <aside className='flex  justify-center items-center text-center  gap-2'>


                    <p className='text-sm opacity-70'>Copyright © {new Date().getFullYear()} - All right reserved. Developed by <span className='font-medium text-green-200'></span>Books Team</p>
                </aside></div>


        </footer>
    );
};

export default Footer;