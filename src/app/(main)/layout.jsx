import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const Layout = ({children}) => {
    return (
        <>
        <Navbar/>
            {children}
            <Footer/>
        </>
    );
};

export default Layout;