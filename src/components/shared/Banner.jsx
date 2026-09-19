'use client';

import Link from 'next/link';
import React from 'react';
import bannerImg from '@/assets/hero.jpg';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Banner = () => {
    return (
        <div
            className='hero min-h-[420px] md:min-h-[520px] overflow-hidden relative'
            style={{
                backgroundImage: `url(${bannerImg.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Overlay */}
            <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40'></div>

            <div className='hero-content text-center text-white relative z-10'>
                <motion.div
                    className='max-w-2xl'
                    variants={container}
                    initial='hidden'
                    animate='show'
                >
                    {/* Trust badge */}
                    <motion.span
                        variants={item}
                        className='inline-block bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-emerald-400/30'
                    >
                        📚 1000+ Books · 500+ Happy Readers
                    </motion.span>

                    {/* Heading */}
                    <motion.h1
                        variants={item}
                        className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight'
                    >
                        Smart Readers <span className='text-emerald-400'>Borrow Books</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p variants={item} className='mt-4 mb-6 text-md text-gray-300 leading-relaxed'>
                        Tired of buying books you'll read once? Borrow instead —
                        same great reads, zero clutter, zero regret.
                    </motion.p>

                    {/* CTA button */}
                    <motion.div variants={item} className='flex flex-col items-center gap-3'>
                        <Link href={'/all-books'}>
                            <motion.button
                                aria-label='Browse all available books'
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    boxShadow: [
                                        '0 0 0px rgba(16,185,129,0.4)',
                                        '0 0 25px rgba(16,185,129,0.6)',
                                        '0 0 0px rgba(16,185,129,0.4)',
                                    ],
                                }}
                                transition={{
                                    boxShadow: {
                                        duration: 2,
                                        repeat: 3,
                                        ease: 'easeInOut',
                                    },
                                }}
                                className='group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-base px-10 py-4 rounded-full transition-colors'
                            >
                                Browse Now
                                <ArrowRight className='w-5 h-5 transition-transform group-hover:translate-x-1' />
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;