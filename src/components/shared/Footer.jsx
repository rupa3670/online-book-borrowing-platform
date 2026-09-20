import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-emerald-900 rounded text-white p-10">
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start w-full'>

                <nav className="flex flex-col gap-4">
                    <h2 className='font-bold text-xl'>MANGO BOOKS</h2>
                    <div className='flex flex-wrap gap-3'>
                        <Link href='/' className="link link-hover">Home</Link>
                        <Link href='/all-books' className="link link-hover">All Books</Link>
                        <Link href='/about' className="link link-hover">About us</Link>
                        <Link href='/contact' className="link link-hover">Contact</Link>
                    </div>
                </nav>

                <nav>
                    <div className='text-center'>
                        <h6 className='font-medium text-lg mb-2'>Contact Us</h6>
                        <p className='text-sm text-emerald-100'>Dhanmondi, Dhaka, Bangladesh</p>
                    </div>
                </nav>

                <nav>
                    <div className="flex flex-col items-center gap-3">
                        <p className='font-medium text-lg border-b border-emerald-700 pb-1'>Social Links</p>
                        <div className='flex gap-4'>
                         <a   
                                href='#'
                                aria-label='Visit our Facebook page'
                                className='text-xl hover:text-emerald-300 transition'
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href='#'
                                aria-label='Visit our YouTube channel'
                                className='text-xl hover:text-emerald-300 transition'
                            >
                                <FaYoutube />
                            </a>
                            <a
                                href='#'
                                aria-label='Visit our Twitter/X page'
                                className='text-xl hover:text-emerald-300 transition'
                            >
                                <FaTwitter />
                            </a>
                        </div>
                    </div>
                </nav>
            </div>

            <div className='w-full border-t border-emerald-800 pt-5 md:pt-8 mx-auto mt-5 md:mt-8'>
                <aside className='flex justify-center items-center text-center gap-2'>
                    <p className='text-sm text-emerald-100'>
                        Copyright © {new Date().getFullYear()} - All rights reserved. Developed by{' '}
                        <span className='font-medium text-white'>Books Team</span>
                    </p>
                </aside>
             </div>
        </footer>
    );
};

export default Footer;