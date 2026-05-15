import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const Layout = ({children}) => {
    return (
        <>
        <Navbar/>
            {children}
            <Footer/>

            <ToastContainer/>
        </>
    );
};

export default Layout;