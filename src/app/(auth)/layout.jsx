import Navbar from '@/components/shared/Navbar';


const Layout = ({children}) => {
    return (
        <>
        <Navbar/>
            {children}
        </>
    );
};

export default Layout;